<?php namespace App\Handles\Backend;



use App\Events\Event;

class LoveHandle
{
    public function __construct()
    {
        
    }

    public function handle(Event $event)
    {
        //This is Logic
        echo 'This is Love Backend\LoveHandle Logic';
        dd($event);

    }
}