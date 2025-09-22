<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Logout user and handle multiple accounts.
     */
    public function logout(Request $request)
    {
        $userId = Auth::id();

        Auth::logout();

        $accountIds = $request->session()->get('authenticated_account_ids', []);

        if (is_array($accountIds)) {
            $accountIds = array_filter($accountIds, fn($id) => $id !== $userId);
            $request->session()->put('authenticated_account_ids', $accountIds);
        }

        if (!empty($accountIds)) {
            $nextUserId = reset($accountIds);
            $nextUser = User::find($nextUserId);

            if ($nextUser) {
                Auth::login($nextUser);
                return back()->with('success', 'تم تسجيل الخروج وتسجيل الدخول للحساب التالي');
            }
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.index')
            ->with('success', 'تم تسجيل الخروج بنجاح');
    }
}
