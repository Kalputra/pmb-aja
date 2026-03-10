<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // Block non-admin from accessing admin routes
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses ke halaman admin.');
        }

        return $next($request);
    }
}
