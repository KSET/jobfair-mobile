![Logo](repo_banner.png)

# Job Fair Zagreb 
React Native app made using [Shoutem](http://shoutem.github.io/) platform for Job Fair 2017 which is held at FER, University of Zagreb.
 The app is intended for students to have all the information about the event at the tip of their fingers!

Job Fair is an associative effort of multiple members of KSET.

# Setting the project up

To develop app on Shoutem platform you have to create an account on [Shoutem builder](https://builder.shoutem.com/) and install cli `npm install -g @shoutem/cli`.
 You can read more about setting the local environment [here](http://shoutem.github.io/docs/extensions/tutorials/setting-local-environment).
 Enter credentials after running `shoutem login` and push all needed extensions from this directory using `shoutem push`.
 After that, you should be able to see in Shoutem Builder's marketplace your extensions which you can install and start adding screens!

Except extensions, this repo includes `app` directory that contains whole Job Fair React Native app taken using `shoutem pull-app`.
 You should be able to use it as a normal React Native app, without Shoutem (except for the CMS).

# Deploying the project

If your updates involves only Javascript changes and Shoutem CodePush extension is installed, live application can be updated
 automatically when extensions are published - `shoutem push` && `shoutem publish`.

# Contribution guide

Not yet defined.

# Copyright

The Job Fair logo is under copyright by [KSET](https://www.kset.org).

Copyright 2017. KSET
