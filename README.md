# angular2-bundle-all-single-script

Angular2-bundle-all-single-script, as the name suggests lets you bundle all your angular2 related components, directives, css, htmls into a single .js file which you can plug and use anywhere.

This also includes,

- Conversion of typescript to javascript
- Sass to CSS
- All minified
- Bundled as SystemJS modules
- Uses gulp internally for bundling and for other related conversions, task runnings.

All you have to do is follow these simple steps:

- Run gulp (This internally runs two tasks, tsTask and tsNextTask)
- In tsTask gulp task, you can find this line: 
```sh
var tsResult = gulp.src('src/**/*.ts', {base: './src'})
```
- In this line, you can go ahead and change the base path for your ts files or your application.
- For example.) If your typescript files are present inside a base folder named 'app', you can go ahead and change them as 
```sh
var tsResult = gulp.src('app/**/*.ts', {base: './app'})
```
- In the same task, you can find a line that specifies the destination folder, you can go ahead and alter them as well.
```sh
return tsResult.js
		.pipe(gulp.dest('build/js'));
```
- Here 'build/js' is used, you can change as 'build' or 'destination' or 'dest/app/js' or whatever.
- In the 'tsNextTask', make sure you give the same path as you had given for the destination in the previous task(tsTask). If there is another folder level, make sure you add that too. In this case, 'build/js' is the destination but 'build/js/app' is used as it drills down into one more level for finding the files (Else it fails searching for the files in the base)
- Also make sure, you add the required external dependencies you have used in your project/application in the meta configuration of system builder.
i.e)
```sh
var builder = new Builder('buil/js/app', {
        paths: {
            '*': '*.js'
        },
        meta: {
            '@angular/*': {
                build: false
            },
            'rxjs/*': {
                build: false
            },
            'd3': {
                build: false
            },
            'topojson': {
                build: false
            }
        }
    });
```
> In the above builder setup, we have used paths and meta objects. In meta objects, there are references to external dependencies, for example, if you use 'd3' for charts or graphs, you might have to include the same over here as ```
'd3': {
                build: false
            }
            ```
And the same way goes for other dependencies.
- In the last line of the 'tsNextTask', you can give your own desired name for the bundle.
```sh
return builder.bundle('main', 'build/js/app.bundle.js');
```
- Here it is app.bundle.js, it gets created inside 'build/js' directory. You can use, 'application.bundle.js' or 'application.js' or simply even 'bundle.js'.


### Tech

This uses a number of open source projects to work properly:

* [node.js] - For installing and using NPM modules
* [Gulp] - the streaming build system, task running and bundling

### Usage

- Open a git bash
- Navigate to a directory, where you want this code to be cloned.
- Type the following command, in case you're using ssh mode of cloning
```sh
git clone git@github.com:arunkumars08/angular2-bundle-all-single-script.git
```
- In case you're using HTTPS mode, use the following,
```
git clone https://github.com/arunkumars08/angular2-bundle-all-single-script.git
```
- You could see angular2-bundle-all-single-script folder created
- Navigate inside the folder in Git bash by giving the following command in git bash
```sh
cd angular2-bundle-all-single-script
```
- Now, you are in the projects directory
- You can do two things
- 1. You can point to your applications source folder from here, relatively
- 2. You can copy the gulpfile.js and package.json from here to your application and run it from there. (Make sure you don't replace the existing package.json and gulpfile.js of your application in case you have any. 
- > For that, easier way is to temporarily rename your application's gulpfile and package file to a new name until this bundling and later on change it back to their original names)
- Once you have decided which step to follow, give the following command in the same directory where you have this package.json.
```sh
npm install
```
- This creates nececessary dependencies
- Once they are installed, run 
```sh
gulp 
```

### Todos

 - Update Readme for vendor bundling
 - Update gulp for effective vendor bundling
 - Update author information

License
----
MIT

**Free Software**
