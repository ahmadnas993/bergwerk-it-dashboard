<?php

declare(strict_types=1);

namespace Modules\Auth\Console;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateOperatorCommand extends Command
{
    protected $signature = 'operator:create {--name=} {--email=} {--password=}';

    protected $description = 'Create an operator user (is_operator=true). No public signup; bootstrap only.';

    public function handle(): int
    {
        $name = (string) $this->option('name');
        $email = (string) $this->option('email');
        $password = $this->option('password');

        if ($password === null) {
            $password = $this->secret('Password (min 12 chars)');
            $confirm = $this->secret('Confirm password');

            if ($password !== $confirm) {
                $this->error('Passwords do not match.');

                return self::FAILURE;
            }
        }

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => 'required|string|min:1',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:12',
        ]);

        if ($validator->fails()) {
            $this->error('Validation failed:');
            foreach ($validator->errors()->all() as $error) {
                $this->error("  - {$error}");
            }

            return self::FAILURE;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'is_operator' => true,
        ]);

        $this->info('Operator created.');
        $this->line("ID: {$user->id}");
        $this->line("Email: {$user->email}");

        return self::SUCCESS;
    }
}
