
# Studying

Simple react project (like TODO) for manage the list of study materials.

Now, it parsed materials from:

* udacity.com
* egghead.io
* it.mail.ru

To run the project you need to install dependencies and run "npm run build".

The server automatically run parser on selenium, collect all materials and run server using pm2.

You may also need some global npm packages.

All parser located in "src/js/collect-data". You can extend them as needed.

To quickly reset of the progress, just delete all json files from "src/json" and  run "npm run build".