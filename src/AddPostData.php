<?php

/*
 * This file is part of malago/achievements
 *
 *  Copyright (c) 2021 Miguel A. Lago
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */

namespace Malago\Achievements;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\Post\Post;

class AddPostData
{
    public function __invoke(PostSerializer $serializer, Post $post, array $attributes): array
    {
        $achievements = AchievementUser::query()->where(['user_id' => $post->user->id])->get();
        $attributes['achievements']=array();
        foreach($achievements as $ach){
            $achievement_data = Achievement::query()->where(['id' => $ach['achievement_id']])->get();

            $attributes['achievements'][] = array(
                "name" => $achievement_data[0]["name"],
                "description" => $achievement_data[0]["description"],
                "image" => $achievement_data[0]["image"],
                "rectangle" => $achievement_data[0]["rectangle"],
                "points" => $achievement_data[0]["points"],
                "new" => $achievement_data[0]["new"],
                "date" => $ach["created_at"]
            );
        }


        return $attributes;
    }
}
