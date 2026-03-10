<?php

require_once 'vendor/autoload.php';

use SimpleSoftwareIO\QrCode\Generator;

echo "Testing QR Code Generation Integration\n";
echo "=====================================\n\n";

// Test 1: PNG format without Imagick (should throw exception)
echo "Test 1: PNG format without Imagick extension\n";
try {
    $generator = new Generator();
    $qrCode = $generator->format('png')->size(200)->generate('Test Data');
    echo "❌ FAILED: PNG generation should have failed without Imagick\n";
} catch (InvalidArgumentException $e) {
    if (str_contains($e->getMessage(), 'Imagick extension')) {
        echo "✅ PASSED: Correctly threw exception: " . $e->getMessage() . "\n";
    } else {
        echo "❌ FAILED: Wrong exception message: " . $e->getMessage() . "\n";
    }
} catch (Exception $e) {
    echo "❌ FAILED: Unexpected exception: " . $e->getMessage() . "\n";
}

echo "\n";

// Test 2: SVG format (should work)
echo "Test 2: SVG format generation\n";
try {
    $generator = new Generator();
    $qrCode = $generator->format('svg')->size(200)->generate('Test Data');
    if (str_contains($qrCode, '<svg') && str_contains($qrCode, '</svg>')) {
        echo "✅ PASSED: SVG QR code generated successfully\n";
    } else {
        echo "❌ FAILED: Generated content doesn't look like SVG\n";
    }
} catch (Exception $e) {
    echo "❌ FAILED: SVG generation failed: " . $e->getMessage() . "\n";
}

echo "\n";

// Test 3: EPS format (should work)
echo "Test 3: EPS format generation\n";
try {
    $generator = new Generator();
    $qrCode = $generator->format('eps')->generate('Test Data');
    if (str_contains($qrCode, '%!PS-Adobe') && str_contains($qrCode, 'EPSF')) {
        echo "✅ PASSED: EPS QR code generated successfully\n";
    } else {
        echo "❌ FAILED: Generated content doesn't look like EPS\n";
    }
} catch (Exception $e) {
    echo "❌ FAILED: EPS generation failed: " . $e->getMessage() . "\n";
}

echo "\n";

// Test 4: Large data string
echo "Test 4: Large data string handling\n";
try {
    $largeData = str_repeat('A', 1000); // 1000 character string
    $generator = new Generator();
    $qrCode = $generator->format('svg')->generate($largeData);
    echo "✅ PASSED: Large data string handled successfully\n";
} catch (Exception $e) {
    echo "❌ FAILED: Large data string failed: " . $e->getMessage() . "\n";
}

echo "\n";

// Test 5: Invalid format
echo "Test 5: Invalid format handling\n";
try {
    $generator = new Generator();
    $qrCode = $generator->format('invalid')->generate('Test Data');
    echo "❌ FAILED: Invalid format should have thrown exception\n";
} catch (InvalidArgumentException $e) {
    echo "✅ PASSED: Correctly threw exception for invalid format\n";
} catch (Exception $e) {
    echo "❌ FAILED: Unexpected exception: " . $e->getMessage() . "\n";
}

echo "\n";

// Test 6: Error correction levels
echo "Test 6: Error correction levels\n";
$levels = ['L', 'M', 'Q', 'H'];
foreach ($levels as $level) {
    try {
        $generator = new Generator();
        $qrCode = $generator->format('svg')->errorCorrection($level)->generate('Test Data');
        echo "✅ PASSED: Error correction level '$level' works\n";
    } catch (Exception $e) {
        echo "❌ FAILED: Error correction level '$level' failed: " . $e->getMessage() . "\n";
    }
}

echo "\n";
echo "Testing completed!\n";
