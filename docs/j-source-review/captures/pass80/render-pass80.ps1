$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore,PresentationFramework,WindowsBase
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

function Brush-From([string]$text) {
  if (-not $text -or $text -eq 'none') { return $null }
  return [System.Windows.Media.BrushConverter]::new().ConvertFromString($text)
}
function Pen-From($node) {
  $stroke = Brush-From $node.GetAttribute('stroke')
  if (-not $stroke) { return $null }
  $widthText = $node.GetAttribute('stroke-width')
  $width = if ($widthText) { [double]$widthText } else { 1.0 }
  return [System.Windows.Media.Pen]::new($stroke,$width)
}
function Render-Svg([string]$svgPath,[string]$outputPath,[int]$size) {
  [xml]$doc = Get-Content -LiteralPath $svgPath -Raw
  $svg = $doc.DocumentElement
  $vb = $svg.GetAttribute('viewBox').Split(' ')
  $viewWidth = [double]$vb[2]; $viewHeight = [double]$vb[3]
  $visual = [System.Windows.Media.DrawingVisual]::new()
  $ctx = $visual.RenderOpen()
  $ctx.PushTransform([System.Windows.Media.ScaleTransform]::new($size/$viewWidth,$size/$viewHeight))
  $nodes = @()
  foreach ($node in $svg.ChildNodes) {
    if ($node.NodeType -ne [System.Xml.XmlNodeType]::Element) { continue }
    if ($node.LocalName -eq 'g') {
      foreach ($child in $node.ChildNodes) { if ($child.NodeType -eq [System.Xml.XmlNodeType]::Element) { $nodes += $child } }
    } else { $nodes += $node }
  }
  foreach ($node in $nodes) {
    if ($node.NodeType -ne [System.Xml.XmlNodeType]::Element) { continue }
    $name = $node.LocalName
    if ($name -eq 'rect') {
      $x = [double]$node.GetAttribute('x'); $y = [double]$node.GetAttribute('y')
      $w = [double]$node.GetAttribute('width'); $h = [double]$node.GetAttribute('height')
      $ctx.DrawRectangle((Brush-From $node.GetAttribute('fill')),(Pen-From $node),[System.Windows.Rect]::new($x,$y,$w,$h))
    } elseif ($name -eq 'ellipse') {
      $cx = [double]$node.GetAttribute('cx'); $cy = [double]$node.GetAttribute('cy')
      $rx = [double]$node.GetAttribute('rx'); $ry = [double]$node.GetAttribute('ry')
      $geo = [System.Windows.Media.EllipseGeometry]::new([System.Windows.Point]::new($cx,$cy),$rx,$ry)
      $ctx.DrawGeometry((Brush-From $node.GetAttribute('fill')),(Pen-From $node),$geo)
    } elseif ($name -eq 'path') {
      $geo = [System.Windows.Media.Geometry]::Parse($node.GetAttribute('d'))
      $ctx.DrawGeometry((Brush-From $node.GetAttribute('fill')),(Pen-From $node),$geo)
    }
  }
  $ctx.Pop(); $ctx.Close()
  $bitmap = [System.Windows.Media.Imaging.RenderTargetBitmap]::new($size,$size,96,96,[System.Windows.Media.PixelFormats]::Pbgra32)
  $bitmap.Render($visual)
  $encoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new()
  $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap))
  $file = [System.IO.File]::Create($outputPath); $encoder.Save($file); $file.Close()
  return $bitmap
}
function Render-Raster([string]$inputPath,[string]$outputPath,[int]$size) {
  $bitmap = [System.Windows.Media.Imaging.BitmapImage]::new()
  $bitmap.BeginInit(); $bitmap.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $bitmap.UriSource = [Uri]::new((Resolve-Path -LiteralPath $inputPath).Path); $bitmap.EndInit(); $bitmap.Freeze()
  $visual = [System.Windows.Media.DrawingVisual]::new(); $ctx = $visual.RenderOpen()
  $ctx.DrawRectangle([System.Windows.Media.Brushes]::Black,$null,[System.Windows.Rect]::new(0,0,$size,$size))
  $ctx.DrawImage($bitmap,[System.Windows.Rect]::new(0,0,$size,$size)); $ctx.Close()
  $out = [System.Windows.Media.Imaging.RenderTargetBitmap]::new($size,$size,96,96,[System.Windows.Media.PixelFormats]::Pbgra32); $out.Render($visual)
  $encoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new(); $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($out))
  $file = [System.IO.File]::Create($outputPath); $encoder.Save($file); $file.Close()
  return $out
}
function Save-Zoom([System.Windows.Media.Imaging.RenderTargetBitmap]$bitmap,[string]$outputPath,[int]$zoom=10) {
  $size = $bitmap.PixelWidth; $source = New-Object byte[] ($size*$size*4); $bitmap.CopyPixels($source,$size*4,0)
  $zoomSize = $size*$zoom; $dest = New-Object byte[] ($zoomSize*$zoomSize*4)
  for ($y=0; $y -lt $size; $y++) { for ($x=0; $x -lt $size; $x++) {
    $src = ($y*$size+$x)*4
    for ($dy=0; $dy -lt $zoom; $dy++) { for ($dx=0; $dx -lt $zoom; $dx++) {
      $dst = ((($y*$zoom+$dy)*$zoomSize)+($x*$zoom+$dx))*4
      [Array]::Copy($source,$src,$dest,$dst,4)
    } }
  } }
  $z = [System.Windows.Media.Imaging.WriteableBitmap]::new($zoomSize,$zoomSize,96,96,[System.Windows.Media.PixelFormats]::Pbgra32,$null)
  $z.WritePixels([System.Windows.Int32Rect]::new(0,0,$zoomSize,$zoomSize),$dest,$zoomSize*4,0)
  $encoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new(); $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($z))
  $file = [System.IO.File]::Create($outputPath); $encoder.Save($file); $file.Close()
}

$wholeSvg = Join-Path $root 'pass80-source.svg'
$jSvg = Join-Path $root 'pass80-j-only.svg'
foreach ($size in @(468,54,32)) {
  $outPath = if ($size -eq 468) { Join-Path $root 'pass80-468-native.png' } else { Join-Path $root "pass80-$size-native.png" }
  $bitmap = Render-Svg $wholeSvg $outPath $size
  if ($size -le 54) { Save-Zoom $bitmap (Join-Path $root "pass80-$size-pixelzoom.png") }
}
$j16 = Render-Svg $jSvg (Join-Path $root 'pass80-j-16-native.png') 16
Save-Zoom $j16 (Join-Path $root 'pass80-j-16-pixelzoom.png')

$sources = @(
  @{Name='archive'; File=(Join-Path $root 'references/archive-159-2.png')},
  @{Name='current'; File=(Join-Path $root 'references/current-1950-6.png')},
  @{Name='pass16'; File=(Join-Path $root 'references/pass16-archive-led.png')},
  @{Name='pass78'; File=(Join-Path $root 'references/pass78-source-468.png')}
)
foreach ($source in $sources) {
  foreach ($size in @(468,54,32)) {
    Render-Raster $source.File (Join-Path $root "$($source.Name)-$size.png") $size | Out-Null
  }
}
foreach ($size in @(468,54,32)) {
  Render-Svg (Join-Path $root 'references/pass79-source.svg') (Join-Path $root "pass79-$size.png") $size | Out-Null
}
Render-Svg (Join-Path $root 'references/ringless-16-control.svg') (Join-Path $root 'control-16.png') 16 | Out-Null

Write-Output 'Rendered Pass80 full mark at 468/54/32, its ring-free 16px reduction, and all reference proofs.'
