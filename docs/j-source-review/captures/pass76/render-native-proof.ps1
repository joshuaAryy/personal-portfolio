param([string]$SvgPath,[string]$OutputStem,[int]$Size)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore,PresentationFramework,WindowsBase
[xml]$doc = Get-Content -LiteralPath $SvgPath -Raw
$pathNode = $doc.SelectSingleNode("//*[local-name()='path']")
$svgNode = $doc.DocumentElement
$viewBox = $svgNode.GetAttribute('viewBox').Split(' ')
$viewWidth = [double]$viewBox[2]
$viewHeight = [double]$viewBox[3]
$geometry = ([System.Windows.Media.Geometry]::Parse($pathNode.GetAttribute('d'))).CloneCurrentValue()
$geometry.Transform = [System.Windows.Media.MatrixTransform]::new([System.Windows.Media.Matrix]::new(.67,0,0,.738,-5.2,5))
$visual = [System.Windows.Media.DrawingVisual]::new()
$context = $visual.RenderOpen()
$context.DrawRectangle([System.Windows.Media.Brushes]::Black,$null,[System.Windows.Rect]::new(0,0,$Size,$Size))
$context.PushTransform([System.Windows.Media.ScaleTransform]::new($Size/$viewWidth,$Size/$viewHeight))
$fill = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#D7DADF')
$strokeBrush = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#8A9098')
$pen = [System.Windows.Media.Pen]::new($strokeBrush,9)
$context.DrawGeometry($fill,$pen,$geometry)
$context.Pop()
$context.Close()
$bitmap = [System.Windows.Media.Imaging.RenderTargetBitmap]::new($Size,$Size,96,96,[System.Windows.Media.PixelFormats]::Pbgra32)
$bitmap.Render($visual)
$encoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new()
$encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap))
$outPath = "$OutputStem-$Size-native.png"
$file = [System.IO.File]::Create($outPath)
$encoder.Save($file)
$file.Close()
$sourceBytes = New-Object byte[] ($Size*$Size*4)
$bitmap.CopyPixels($sourceBytes,$Size*4,0)
$zoom = 10
$zoomSize = $Size*$zoom
$zoomBytes = New-Object byte[] ($zoomSize*$zoomSize*4)
for ($y=0; $y -lt $Size; $y++) {
  for ($x=0; $x -lt $Size; $x++) {
    $src = ($y*$Size+$x)*4
    for ($dy=0; $dy -lt $zoom; $dy++) {
      for ($dx=0; $dx -lt $zoom; $dx++) {
        $dst = ((($y*$zoom+$dy)*$zoomSize)+($x*$zoom+$dx))*4
        [Array]::Copy($sourceBytes,$src,$zoomBytes,$dst,4)
      }
    }
  }
}
$zoomBitmap = [System.Windows.Media.Imaging.WriteableBitmap]::new($zoomSize,$zoomSize,96,96,[System.Windows.Media.PixelFormats]::Pbgra32,$null)
$zoomBitmap.WritePixels([System.Windows.Int32Rect]::new(0,0,$zoomSize,$zoomSize),$zoomBytes,$zoomSize*4,0)
$zoomEncoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new()
$zoomEncoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($zoomBitmap))
$zoomFile = [System.IO.File]::Create("$OutputStem-$Size-pixelzoom.png")
$zoomEncoder.Save($zoomFile)
$zoomFile.Close()
