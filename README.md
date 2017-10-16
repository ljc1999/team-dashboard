# Team Dashboard

The team dashboad to track progress over the Mission to Mars programme.

### MUCH WOW!!!

Look at all these libraries Barry cobbled together and tests he didn't write!


### VERY UNFINISHED!!!

Need to add a sync to remote couchDB backend.

If this gets any bigger than two pages, or is going to be used again, re-add
karma to the grunt test task and write some tests ya lazy scoundrel.


### But seriously...

All the good stuff is in app.

Do all the dev stuff (below) to make it an application

Application will be found in dist

Das ist alles.


## "The Dev Stuff"

    npm install;
    npm run build:all; #to build once
    npm run serve; # to serve as an application

To use brower-sync, in a new terminal navigate to the project root and run:

    browser-sync start --proxy 'localhost:9000'
