<?php

namespace App\Services;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class QRCodeService
{
    /**
     * Generate QR Code and save to storage
     * 
     * @param string $data
     * @param string|null $fileName
     * @return array ['path' => string, 'url' => string, 'svg' => string]
     */
    public function generateQRCode($data, $fileName = null)
    {
        // Generate unique filename if not provided
        if (!$fileName) {
            $fileName = 'qr_' . Str::uuid() . '.svg';
        }

        // Generate QR code SVG
        $qrCode = QrCode::size(300)
            ->format('svg')
            ->generate($data);

        // Save to storage (public disk)
        $path = 'qrcodes/' . $fileName;
        Storage::disk('public')->put($path, $qrCode);

        return [
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
            'svg' => $qrCode,
            'filename' => $fileName
        ];
    }

    /**
     * Generate QR Code as PNG and save to storage
     * 
     * @param string $data
     * @param string|null $fileName
     * @return array ['path' => string, 'url' => string]
     */
    public function generateQRCodePNG($data, $fileName = null)
    {
        // Generate unique filename if not provided
        if (!$fileName) {
            $fileName = 'qr_' . Str::uuid() . '.png';
        }

        // Generate QR code PNG
        $qrCode = QrCode::size(300)
            ->format('png')
            ->generate($data);

        // Save to storage (public disk)
        $path = 'qrcodes/' . $fileName;
        Storage::disk('public')->put($path, $qrCode);

        return [
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
            'filename' => $fileName
        ];
    }

    /**
     * Scan/Decode QR code from uploaded file
     * 
     * @param string $filePath
     * @return string|null
     */
    public function scanQRCode($filePath)
    {
        // This requires a QR decoder library
        // Install: composer require zxing/zxingcore
        try {
            // Placeholder for QR scanning logic
            // You'll need to implement actual QR decoding here
            return null;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Delete QR code file from storage
     * 
     * @param string $path
     * @return bool
     */
    public function deleteQRCode($path)
    {
        return Storage::disk('public')->delete($path);
    }
}