$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore,PresentationFramework,WindowsBase
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$width = 2800; $height = 1040
$visual = [System.Windows.Media.DrawingVisual]::new(); $dc = $visual.RenderOpen()
$bg = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#0c0f13')
$text = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#e7edf2')
$muted = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#aab4bd')
$gold = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#f0dfb0')
$card = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#080a0d')
$border = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#39434e')
$dc.DrawRectangle($bg,$null,[System.Windows.Rect]::new(0,0,$width,$height))
function Draw-Text($ctx,[string]$value,[double]$x,[double]$y,[double]$size,$brush,[bool]$bold=$false) {
  $weight = if ($bold) { [System.Windows.FontWeights]::Bold } else { [System.Windows.FontWeights]::Normal }
  $typeface = [System.Windows.Media.Typeface]::new('Segoe UI',$([System.Windows.FontStyles]::Normal),$weight,[System.Windows.FontStretches]::Normal)
  $formatted = [System.Windows.Media.FormattedText]::new($value,[System.Globalization.CultureInfo]::CurrentCulture,[System.Windows.FlowDirection]::LeftToRight,$typeface,$size,$brush,96)
  $ctx.DrawText($formatted,[System.Windows.Point]::new($x,$y))
}
function Load-Bitmap([string]$file) {
  $bmp = [System.Windows.Media.Imaging.BitmapImage]::new(); $bmp.BeginInit()
  $bmp.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $bmp.UriSource = [Uri]::new((Resolve-Path -LiteralPath $file).Path); $bmp.EndInit(); $bmp.Freeze(); return $bmp
}
function Draw-Fit($ctx,[string]$file,[double]$x,[double]$y,[double]$boxW,[double]$boxH) {
  $bmp = Load-Bitmap $file
  $scale = [Math]::Min($boxW/$bmp.PixelWidth,$boxH/$bmp.PixelHeight)
  $drawW = $bmp.PixelWidth*$scale; $drawH = $bmp.PixelHeight*$scale
  $dx = $x+($boxW-$drawW)/2; $dy = $y+($boxH-$drawH)/2
  $ctx.DrawRectangle($card,$null,[System.Windows.Rect]::new($x,$y,$boxW,$boxH))
  $ctx.DrawRectangle($border,$null,[System.Windows.Rect]::new($x,$y,$boxW,$boxH))
  $ctx.DrawImage($bmp,[System.Windows.Rect]::new($dx,$dy,$drawW,$drawH))
}
function Draw-Native($ctx,[string]$file,[double]$x,[double]$y,[int]$size) {
  $bmp = Load-Bitmap $file; $ctx.DrawImage($bmp,[System.Windows.Rect]::new($x,$y,$size,$size))
}

Draw-Text $dc 'PASS79 - ARCHIVE-LED FLAT MACRO STUDY' 32 20 26 $gold $true
Draw-Text $dc 'One simplified crown / shaft / rising-hook trace with the archive-sized blue field and a single rim behind the J. Flat color keeps the first read on proportion and J-orbit overlap; archive raster remains the stronger material standard.' 32 55 14 $muted
Draw-Text $dc '468px FIRST READ - ARCHIVE / CURRENT / PASS16 / PASS78 / PASS79' 32 84 17 $gold $true
$cards = @(
  @{Title='ARCHIVE - 159:2'; File='archive-468.png'},
  @{Title='CURRENT - 1950:6'; File='current-468.png'},
  @{Title='PASS16 - PRIOR INTEGRATED STUDY'; File='pass16-468.png'},
  @{Title='PASS78 - ORBIT-FREE SHAFT CONTROL'; File='pass78-468.png'},
  @{Title='PASS79 - ARCHIVE-PROPORTION TRACE'; File='pass79-468-native.png'}
)
for ($i=0; $i -lt $cards.Count; $i++) {
  $x = 32+($i*550)
  Draw-Text $dc $cards[$i].Title $x 108 12 $text $true
  Draw-Fit $dc (Join-Path $root $cards[$i].File) $x 130 468 468
}

Draw-Text $dc 'NATIVE 54px / 32px COMPOSITE READ' 32 625 17 $gold $true
$proofs = @(
  @{Title='ARCHIVE'; Prefix='archive'},
  @{Title='CURRENT'; Prefix='current'},
  @{Title='PASS16'; Prefix='pass16'},
  @{Title='PASS78'; Prefix='pass78'},
  @{Title='PASS79'; Prefix='pass79'}
)
for ($i=0; $i -lt $proofs.Count; $i++) {
  $x=32+($i*550)
  Draw-Text $dc $proofs[$i].Title $x 652 12 $text $true
  Draw-Text $dc '54px' $x 678 10 $muted
  Draw-Text $dc '32px' ($x+78) 678 10 $muted
  $file54 = if ($proofs[$i].Prefix -eq 'pass79') { Join-Path $root 'pass79-54-native.png' } else { Join-Path $root "$($proofs[$i].Prefix)-54.png" }
  $file32 = if ($proofs[$i].Prefix -eq 'pass79') { Join-Path $root 'pass79-32-native.png' } else { Join-Path $root "$($proofs[$i].Prefix)-32.png" }
  Draw-Native $dc $file54 $x 695 54
  Draw-Native $dc $file32 ($x+78) 706 32
}

Draw-Text $dc 'RING-FREE 16px GLYPH CHECK' 32 790 16 $gold $true
Draw-Text $dc 'Pass79 trace' 32 824 11 $text
Draw-Native $dc (Join-Path $root 'pass79-j-16-native.png') 112 822 16
Draw-Text $dc 'Separate simplified control' 157 824 11 $text
Draw-Native $dc (Join-Path $root 'control-16.png') 296 822 16
Draw-Text $dc 'The 16px samples are glyph-only; the orbit is evaluated at 54/32px.' 332 824 11 $muted
Draw-Text $dc 'Exploratory local study only; no Figma, shared identity asset, or production edit. Pass79 is not approved.' 32 970 11 $muted
$dc.Close()
$bitmap = [System.Windows.Media.Imaging.RenderTargetBitmap]::new($width,$height,96,96,[System.Windows.Media.PixelFormats]::Pbgra32); $bitmap.Render($visual)
$encoder=[System.Windows.Media.Imaging.PngBitmapEncoder]::new(); $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap))
$file=[System.IO.File]::Create((Join-Path $root 'pass79-comparison.png')); $encoder.Save($file); $file.Close()
Write-Output 'Wrote pass79-comparison.png'
