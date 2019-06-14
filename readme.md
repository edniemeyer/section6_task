# Section6 Task
## Running
To run the code, first run `npm i` to install the necessary packages, then `npm run build` to build the app. `npm run start` will start the local server 
## Questions
- What challenges did you encounter during the timestamp conversion? How did you resolve these?
>I was already used to do this type of conversions on my last job, so I knew the package "moment.js" could handle it pretty well. Needed to add the package "moment-timezone.js" to be able to add the literal format of the timezone (ie NZST) as well as ignoreCache in the cases the timezone of the user changes. The biggest issues came with the necessity of getting the timezone from a specific location, which I did using the package "geo-tz.js", some of the locations are no longer in use for timezone, so the formatting don't show the abbreviation of the timezone in some cases (ie Antarctica/Syowa).
- Were there any details where you had to make assumptions or decide to implement imperfectly?
>I had to implement imperfectly on these specific timezone cases mentioned before, on these cases I just used the timezone offset to UTC instead of the abbreviation, because that's how the package "moment.js" handle it.
- If you were to redo this task, what improvements would you consider making?
>Would try to fix these specific timezone cases, add automated testing and modularize better the code.