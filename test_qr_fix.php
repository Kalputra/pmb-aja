<?php

require_once 'vendor/autoload.php';

use SimpleSoftwareIO\QrCode\Generator;

try {
    // Test generating a QR code in PNG format without Imagick
    $generator = new Generator();
    $qrCode = $generator->format('png')->size(200)->generate('Test QR Code');
    echo "QR Code generated successfully (this should not happen without Imagick).\n";
} catch (InvalidArgumentException $e) {
    echo "Expected error: " . $e->getMessage() . "\n";
    echo "Fix is working correctly.\n";
} catch (Exception $e) {
    echo "Unexpected error: " . $e->getMessage() . "\n";
}

try {
    // Test generating a QR code in SVG format (should work)
    $generator = new Generator();
    $qrCode = $generator->format('svg')->size(200)->generate('Test QR Code');
    echo "SVG QR Code generated successfully.\n";
} catch (Exception $e) {
    echo "SVG generation failed: " . $e->getMessage() . "\n";
}
