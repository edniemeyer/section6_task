#Section6 Task
##Running
To run the code, first run `npm i` to install the necessary packages, then `npm run build` to build the app. `npm run start` will start the local server 
##Questions
- What challenges did you encounter during the timestamp conversion? How did you resolve these?
>I was already used to do this type of conversions on my last job, so I knew the package "moment.js" could handle it pretty well. Needed to add the package "moment-timezone.js" to be able to add the literal format of the timezone (ie NZST) as well as ignoreCache in the cases the timezone of the user changes.
- Were there any details where you had to make assumptions or decide to implement imperfectly?
>I had to assume the user will be running the code locally, so we could guess the timezone from his local device. If the user will be a client, accessing the data from a web service, then the implementation should be different.
- If you were to redo this task, what improvements would you consider making?
>Would add automated testing and modularize better the code.