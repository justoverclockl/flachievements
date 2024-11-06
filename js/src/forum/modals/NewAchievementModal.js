/*
 *  Achievements Extension for Flarum
 *  Author: Miguel A. Lago
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 */

import app from 'flarum/app';
import icon from "flarum/helpers/icon";
import Modal from 'flarum/components/Modal';
import ItemList from "flarum/utils/ItemList";
import Button from "flarum/components/Button";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";

export default class NewAchievementModal extends Modal {


    title() {
        return app.translator.trans('malago-achievements.forum.new_achievement_title');
    }

    oninit(vnode) {
        super.oninit(vnode);
    }

  fields() {
    const items = new ItemList();

    this.attrs.achievements.forEach((achievement, index) => {
      const [x, y, height, width] = achievement.rectangle.split(',').map(Number);

      if (achievement.image.includes("http")) {
        const style = {
          backgroundImage: `url(${achievement.image})`,
          backgroundPosition: `-${x}px -${y}px`,
          height: `${height}px`,
          width: `${width}px`,
        };

        items.add(
          `image${index}`,
          <div className="Form-group">
            <span className="Badge Achievement" style={style}></span>
          </div>,
          -10
        );
      } else {
        items.add(
          `image${index}`,
          <div className="Form-group">
            <span className="Badge Achievement--Icon">{icon(achievement.image)}</span>
          </div>,
          -10
        );
      }

      items.add(
        `name${index}`,
        <div className="Form-group">
          <h1>{achievement.name}</h1>
        </div>,
        -10
      );

      items.add(
        `description${index}`,
        <div className="Form-group">
          <h3>{achievement.description}</h3>
        </div>,
        -10
      );
    });

    items.add(
      "close",
      <div className="NewAchievementModal--Button">
        {Button.component(
          {
            type: "button",
            className: "Button Button--primary",
            onclick: this.hide.bind(this),
          },
          app.translator.trans("malago-achievements.forum.new_achievement_close")
        )}
      </div>,
      -10
    );

    return items;
  }

    footer() {
        return null;
    }

    content() {
        if (this.loading) {
            return (
                <div className="Modal-body">
                    <div className="Form">
                        <div className="container">
                            <LoadingIndicator />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="Modal-body">
                <div className="Modal--New-Achievement">{this.fields().toArray()}</div>
            </div>
        );
    }
}
