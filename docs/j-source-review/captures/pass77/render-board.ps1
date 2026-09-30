$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore,PresentationFramework,WindowsBase
$root = Join-Path (Get-Location) 'docs/j-source-review/captures/pass77'
$w = 3200
$h = 1530
$visual = [System.Windows.Media.DrawingVisual]::new()
$dc = $visual.RenderOpen()
$background = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#0c0f13')
$text = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#e9edf1')
$muted = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#aab3bc')
$gold = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#f1dfad')
$card = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#080b0e')
$line = [System.Windows.Media.BrushConverter]::new().ConvertFromString('#37414b')
$dc.DrawRectangle($background,$null,[System.Windows.Rect]::new(0,0,$w,$h))

function Draw-Text($ctx,[string]$value,[double]$x,[double]$y,[double]$size,$brush,[bool]$bold=$false) {
  $weight = if ($bold) { [System.Windows.FontWeights]::Bold } else { [System.Windows.FontWeights]::Normal }
  $typeface = [System.Windows.Media.Typeface]::new('Segoe UI',$([System.Windows.FontStyles]::Normal),$weight,[System.Windows.FontStretches]::Normal)
  $formatted = [System.Windows.Media.FormattedText]::new($value,[System.Globalization.CultureInfo]::CurrentCulture,[System.Windows.FlowDirection]::LeftToRight,$typeface,$size,$brush,96)
  $ctx.DrawText($formatted,[System.Windows.Point]::new($x,$y))
}
function Load-Bitmap([string]$file) {
  $bitmap = [System.Windows.Media.Imaging.BitmapImage]::new()
  $bitmap.BeginInit()
  $bitmap.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $bitmap.UriSource = [Uri]::new((Resolve-Path -LiteralPath $file).Path)
  $bitmap.EndInit()
  $bitmap.Freeze()
  return $bitmap
}
function Draw-Fit($ctx,[string]$file,[double]$x,[double]$y,[double]$boxW,[double]$boxH) {
  $bmp = Load-Bitmap $file
  $scale = [Math]::Min($boxW/$bmp.PixelWidth,$boxH/$bmp.PixelHeight)
  $drawW = $bmp.PixelWidth*$scale
  $drawH = $bmp.PixelHeight*$scale
  $dx = $x+($boxW-$drawW)/2
  $dy = $y+($boxH-$drawH)/2
  $ctx.DrawRectangle($card,$null,[System.Windows.Rect]::new($x,$y,$boxW,$boxH))
  $ctx.DrawImage($bmp,[System.Windows.Rect]::new($dx,$dy,$drawW,$drawH))
}
function Draw-Native($ctx,[string]$file,[double]$x,[double]$y,[int]$size) {
  $bmp = Load-Bitmap $file
  $ctx.DrawImage($bmp,[System.Windows.Rect]::new($x,$y,$size,$size))
}

Draw-Text $dc 'PASS77 - ARCHIVE-LED SHAFT WEIGHT CHECK' 32 22 28 $gold $true
Draw-Text $dc 'Only the right outer shaft bows outward by at most 6 source units (about 4px at 468); crown, hook, inner edge/counter, endpoints and overall height stay fixed.' 32 60 15 $muted

Draw-Text $dc '468px FIRST READ - ARCHIVE / CURRENT / UPPER SERIFS / PASS16 / PASS35' 32 94 18 $gold $true
$referenceCards = @(
  @{Title='ARCHIVE 159:2'; File='docs/j-source-review/01-archive-target-159-2.png'},
  @{Title='CURRENT 1950:6'; File='docs/j-source-review/03-current-hero-1950-6.png'},
  @{Title='UPPER SERIF 2662:47'; File='docs/j-source-review/captures/upper-serif-pass-01/hero-after-468.png'},
  @{Title='UPPER SERIF 2668:6'; File='docs/j-source-review/captures/upper-serif-pass-02/hero-after-468.png'},
  @{Title='PASS16 PRIOR BEST'; File='docs/j-source-review/pass16-archive-led-j-468-2026-09-29.png'},
  @{Title='PASS35 SEED'; File='docs/j-source-review/captures/pass59/pass35-seed-crop.png'}
)
for ($i=0; $i -lt $referenceCards.Count; $i++) {
  $x = 32+($i*525)
  Draw-Text $dc $referenceCards[$i].Title $x 121 12 $text $true
  Draw-Fit $dc $referenceCards[$i].File $x 145 500 278
}

Draw-Text $dc '468px J-ONLY SILHOUETTES - PASS63B / PASS71 / PASS72 / PASS76 / PASS77' 32 442 18 $gold $true
$vectorCards = @(
  @{Title='PASS63B ARCHIVE TRACE'; File='docs/j-source-review/captures/pass77/pass63b-control-468-468-native.png'},
  @{Title='PASS71 SHOULDER CONTROL'; File='docs/j-source-review/captures/pass77/pass71-control-468-468-native.png'},
  @{Title='PASS72 HOOK CONTROL'; File='docs/j-source-review/captures/pass77/pass72-control-468-468-native.png'},
  @{Title='PASS76 FROZEN BASE'; File='docs/j-source-review/captures/pass77/pass76-control-468-468-native.png'},
  @{Title='PASS77 OUTER SHAFT +6'; File='docs/j-source-review/captures/pass77/pass77-468-native.png'}
)
for ($i=0; $i -lt $vectorCards.Count; $i++) {
  $x = 40+($i*630)
  Draw-Text $dc $vectorCards[$i].Title $x 470 13 $text $true
  Draw-Fit $dc $vectorCards[$i].File $x 494 468 468
}

Draw-Text $dc 'NATIVE 54px / 32px READ - ARCHIVE / CURRENT / PASS63B / PASS71 / PASS72 / PASS76 / PASS77' 32 982 18 $gold $true
$proofCards = @(
  @{Title='ARCHIVE'; File='docs/j-source-review/01-archive-target-159-2.png'},
  @{Title='CURRENT'; File='docs/j-source-review/03-current-hero-1950-6.png'},
  @{Title='PASS63B'; File='docs/j-source-review/captures/pass77/pass63b-control-468-468-native.png'},
  @{Title='PASS71'; File='docs/j-source-review/captures/pass77/pass71-control-468-468-native.png'},
  @{Title='PASS72'; File='docs/j-source-review/captures/pass77/pass72-control-468-468-native.png'},
  @{Title='PASS76'; File='docs/j-source-review/captures/pass77/pass76-control-468-468-native.png'},
  @{Title='PASS77'; File='docs/j-source-review/captures/pass77/pass77-468-native.png'}
)
for ($i=0; $i -lt $proofCards.Count; $i++) {
  $x = 30+($i*450)
  Draw-Text $dc $proofCards[$i].Title $x 1010 13 $text $true
  Draw-Text $dc '54px' $x 1042 10 $muted
  Draw-Text $dc '32px' ($x+82) 1042 10 $muted
  if ($i -eq 0 -or $i -eq 1) {
    Draw-Native $dc $proofCards[$i].File $x 1060 54
    Draw-Native $dc $proofCards[$i].File ($x+82) 1071 32
  } else {
    $prefix = switch ($i) { 2 {'pass63b-control'} 3 {'pass71-control'} 4 {'pass72-control'} 5 {'pass76-control'} 6 {'pass77-source'} }
    $f54 = "docs/j-source-review/captures/pass77/$prefix-54-54-native.png"
    $f32 = "docs/j-source-review/captures/pass77/$prefix-32-32-native.png"
    if ($prefix -eq 'pass77-source') { $f54='docs/j-source-review/captures/pass77/pass77-54-native.png'; $f32='docs/j-source-review/captures/pass77/pass77-32-native.png' }
    Draw-Native $dc $f54 $x 1060 54
    Draw-Native $dc $f32 ($x+82) 1071 32
  }
}

Draw-Text $dc 'RING-FREE 16px - PASS77 REDUCTION AND SEPARATE SIMPLIFIED CONTROL' 32 1170 17 $gold $true
Draw-Text $dc 'Native pixels' 32 1207 12 $muted
Draw-Native $dc 'docs/j-source-review/captures/pass77/pass77-16-native.png' 122 1206 16
Draw-Native $dc 'docs/j-source-review/captures/pass77/separate-control-16-native.png' 172 1206 16
Draw-Text $dc 'Pass77' 122 1230 10 $text
Draw-Text $dc 'Control' 172 1230 10 $text
Draw-Text $dc '10x nearest-neighbor detail' 260 1207 12 $muted
Draw-Native $dc 'docs/j-source-review/captures/pass77/pass77-16-pixelzoom.png' 475 1200 160
Draw-Native $dc 'docs/j-source-review/captures/pass77/separate-control-16-pixelzoom.png' 650 1200 160
Draw-Text $dc 'Pass77' 475 1365 10 $text
Draw-Text $dc 'Separate simplified control' 650 1365 10 $text
Draw-Text $dc 'Pass77 keeps full height and the open counter. The 54/32 read should remain unchanged because the added mass is only about 4px at 468; inspect whether that gain is meaningful rather than assuming it improves the identity.' 32 1410 12 $muted
$dc.Close()

$bitmap = [System.Windows.Media.Imaging.RenderTargetBitmap]::new($w,$h,96,96,[System.Windows.Media.PixelFormats]::Pbgra32)
$bitmap.Render($visual)
$encoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new()
$encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap))
$output = [System.IO.File]::Create((Join-Path $root 'pass77-macro-comparison.png'))
$encoder.Save($output)
$output.Close()
Write-Output 'Wrote pass77-macro-comparison.png'
