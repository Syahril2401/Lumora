<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Rename id to user_id and change type if needed, but safer to add new columns
            // and adjust the model to use them.
            
            // Adding columns from Go model
            if (!Schema::hasColumn('users', 'user_id')) {
                $table->char('user_id', 36)->after('id')->nullable()->unique();
            }
            if (!Schema::hasColumn('users', 'password_hash')) {
                $table->string('password_hash')->after('password')->nullable();
            }
            if (!Schema::hasColumn('users', 'level')) {
                $table->string('level', 50)->after('password_hash')->nullable();
            }
            if (!Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('level');
            }
            if (!Schema::hasColumn('users', 'google_id')) {
                $table->string('google_id')->nullable()->after('is_active');
            }
            if (!Schema::hasColumn('users', 'google_access_token')) {
                $table->text('google_access_token')->nullable()->after('google_id');
            }
            if (!Schema::hasColumn('users', 'google_refresh_token')) {
                $table->text('google_refresh_token')->nullable()->after('google_access_token');
            }
            if (!Schema::hasColumn('users', 'deleted_at')) {
                $table->softDeletes();
            }
        });
        
        // Data migration: copy existing data if needed
        // DB::statement('UPDATE users SET user_id = UUID() WHERE user_id IS NULL');
        // DB::statement('UPDATE users SET password_hash = password WHERE password_hash IS NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'user_id',
                'password_hash',
                'level',
                'is_active',
                'google_id',
                'google_access_token',
                'google_refresh_token',
                'deleted_at'
            ]);
        });
    }
};
