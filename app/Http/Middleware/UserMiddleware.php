<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // Block admin from accessing user routes
        if (auth()->user()->isAdmin()) {
            abort(403, 'Admin tidak dapat mengakses halaman user.');
        }

        return $next($request);
    }
}