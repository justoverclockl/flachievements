<?php

/*
 * This file is part of malago/achievements
 *
 *  Copyright (c) 2021 Miguel A. Lago
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */

namespace Malago\Achievements\Listeners;

use Malago\Achievements\AchievementCalculator;
use Flarum\User\Event\LoggedIn;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\Post\CommentPost;

class UpdateAchievementsOnLogin
{

    protected $calculator;

    public function __construct(AchievementCalculator $calculator)
    {
        $this->calculator = $calculator;
    }

    public function handle(LoggedIn $event)
    {
        // Ensure that joined_at is properly parsed as a date
        $datetime1 = date_create($event->user->joined_at);
        $datetime2 = date_create(); // Current date and time

        // Check if the date creation was successful
        if ($datetime1 && $datetime2) {
            // Calculate the difference between the two dates
            $difference = date_diff($datetime2, $datetime1);

            // Get the number of full years
            $years = $difference->y; // 'y' gives the full number of years

            // Build the array for the calculator
            $arr = array(
                array(
                    "type" => "years",
                    "count" => $years,
                    "user" => $event->user,
                    "new" => 1,
                ),
                array(
                    "type" => "avatar",
                    "count" => ($event->user->avatar_url != null ? 1 : -1),
                    "user" => $event->user,
                    "new" => 1,
                )
            );

            // Store the new achievements in the event's actor property
            $event->actor["new_achievements"] = $this->calculator->recalculate($event->user, $arr);
        } else {
            // Handle potential errors in date creation
            throw new \Exception("Invalid date format for user registration date.");
        }
    }

}
