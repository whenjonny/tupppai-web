<?php namespace App\Handles\Frontend;


use App\Events\Event;

class LoveHandle
{
    public function __construct()
    {
        
    }

    public function handle(Event $handle)
    {
        //This is Logic
        echo 'This is Love Frontend\LoveHandle Logic';
        dd($handle);

    }
}