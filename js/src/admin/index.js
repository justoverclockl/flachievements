import app from 'flarum/admin/app';

import registerModels from "../common/registerModels";
import AchievementsPage from "./components/AchievementsPage";

app.initializers.add("justoverclock/flachievements", () => {
  app.extensionData
    .for("justoverclock-flachievements")
    .registerPage(AchievementsPage);

  registerModels();
});
