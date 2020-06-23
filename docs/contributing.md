# Contributing to School Meal Mapper

## Introduction

Thank you for your interest in contributing to the School Meal Mapper (https://school-meal-mapper.github.io/School-Meal-Mapper/) website.

The following is a set of guidelines, to help you contribute to the Meal Mapper project.


## Table of contents

[Contributing code changes](#contributing-code-changes)

- [New developers and good first issues](#new-developers-and-good-first-issues)
- [How to begin](#how-to-begin)
- [Pull requests](#pull-requests)

[Reviews](#reviews)

- [Making changes after the PR is open](#making-changes-after-the-pr-is-open)
- [Keeping your NC COVID Support fork in sync with the main repository](#keeping-your-nc-covid-support-fork-in-sync-with-the-main-repository)
- [Style guidelines](#style-guidelines)

[How to get started with our code](#How-to-get-started-with-our-code)

- [Frontend packages used](#frontend-packages-used)
- [Development machine requirements](#development-machine-requirements)
- [Visual Studio Setup (Optional)](#visual-studio-setup-optional)
- [VS Code Setup (Optional)](#vs-code-setup-optional)
- [Prettier Code Style](#prettier-code-style)

[Getting started](#getting-started)

- [Download the source code](#download-the-source-code)
- [Build the client side project using the Development Mode](#build-the-client-side-project-using-the-development-mode)
- [Where do I put things](#where-do-i-put-things)


## Contributing code changes

This document gives you a quick overview on how to get started.


### New developers and good first issues

If you are a new developer or simply looking for an easy first ticket to work on, try taking a look at any tickets with the [`good first issue`](https://github.com/code-for-chapel-hill/NC-COVID-Support/labels/good%20first%20issue) label. In addition, feel free to reach out to Eliza Paradise (the tech lead) or Kate Hanson (the project manager) if you want a suggestion of where to start!

### How to begin

The short version goes like this:


- **Clone** - Clone the repository using your favorite GitHub tool.

- **Switch to the correct branch** - switch to the `master` branch

- **Build** - build School Meal Mapper locally as described in [Getting started](#Getting-started)

- **Create a new branch** - it would help us if you can always name your branch after the issue you're fixing and follow the format: `issue-12345`. In this case you would be working on issue `12345`.

- **Change** - make your changes, fix a bug 🐛, or add a feature 🆕! Kate and Eliza are always available to offer support if you have any questions or problems.

- **Commit** - done? Yay! 🎉 **Important:** Don't commit to the `master` branch, make sure you have created a new branch as mentioned above.

- **Push** - great, now you can push the changes up to your branch. In order to push to our repository, you must be a member of the School-Meal-Mapper organization. Contact Kate if you have any problems pushing code.

- **Create a pull request** - you're ready to send us your changes. GitHub will have picked up on the new branch you've just pushed and will offer to create a [Pull Request](#pull-requests). Click that green button and away you go.

![Create a pull request](/covid-19-support/src/images/createpullrequest.png)

    Note: If you just need some feedback to progress - you can make use of GitHub's draft pull request status, detailed [here](https://github.blog/2019-02-14-introducing-draft-pull-requests/))

### Pull requests

The most successful pull requests usually look like this:

- Fill in the required template (shown when starting a PR on GitHub), and link your pull request to an issue on our [issue tracker,](https://github.com/code-for-chapel-hill/NC-COVID-Support/issues) if applicable. You can do this by writing "This should close #1234" in the PR description. In this case, you would be closing issue 1234.
- Include screenshots and animated GIFs in your pull request whenever possible to highlight what you have changed.
- Ensure you have run [Prettier](#prettier-code-style) against your code

Again, these are guidelines, not strict requirements. However, the more information that you give to us, the more we have to work with when considering your contributions. Good documentation of a pull request can really speed up the time it takes to review and merge your work!

## Reviews

You've sent us your first contribution - congratulations! Now what?

We can now start reviewing your proposed changes and give you feedback on them. If it's not perfect, we'll either fix up what we need or we may request that you make some additional changes.

### Making changes after the PR is open

If you make changes to your PR, please push them to the same local branch. The pull request automatically updates with the additional commit(s) so we can review it again. If all is well, we'll merge the code :)

### Keeping your local repository in sync with the main repository

We recommend you sync with our repository before you submit your pull request. That way, you can fix any potential merge conflicts and make our lives a little bit easier. You can do this by checking out master, running 'git pull', and then checking out your branch and running 'git merge master'.

If you have submitted a pull request weeks ago and want to work on something new, make sure you have got the latest code to build against.

### Style guidelines

We are using [Prettier](https://prettier.io) to maintain a common code format between developers, you can find out more details in our [Prettier code style](#prettier-code-style) section below.

## How to get started with our code

This section details how to setup your local development environment and talks about the technologies we have used in the project.

### Frontend packages used

VueJS - The Progressive JavaScript Framework - https://vuejs.org/

Vue I18n - Internationalization Plugin - https://kazupon.github.io/vue-i18n/

Vue Leaflet - Mapping - ( Version of Leaflet that works with VueJS ) - https://vue2-leaflet.netlify.com/

BootstrapVue - Responsive Layout - ( Version of Bootstrap that works well with VueJS ) - https://bootstrap-vue.js.org/

### Development machine requirements

#### NodeJS

Make sure you have the latest stable version of NodeJS ( Currently 12.16.1 ) it can be downloaded from here: https://nodejs.org/en/

Once installed you can check at the command line using:

`node --version`

#### NPM

You should also have version 6.14.3 of NPM, again you can check this using the following command:

`npm --version`

If you need to update the NPM version on Windows, use the accepted instructions found here:

[Stack Overflow - How can I update npm on windows](https://stackoverflow.com/questions/18412129/how-can-i-update-npm-on-windows)

Which for reference are:

Open a Powershell window with "Run as Administrator" then use the following three commands:

```
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm install -g npm-windows-upgrade
npm-windows-upgrade
```

#### Backend Requirements

Currently not applicable for this solution as it's currently all front end code.

### Visual Studio Setup (Optional)

If you use Visual Studio it has its own version of NodeJS which will be quite out of date, you can easily set it up to use your default version by adding it's location in the options here:

`Options > Projects and Solutions > Web Package Management > External Web Tools`

You will need to add: `C:\Program Files\nodejs` and then move it to the top of the list so that it's chosen above the current default.

### VS Code Setup (Optional)

If you use Visual Studio code I recommend installing the following plugins:

- ESLint
- Prettier - Code formatter

A good blog post explaining how to set this up can be found here:

[Setting up Prettier on VS Code](https://travishorn.com/setting-up-prettier-on-vs-code-1fd5e5a43523)

### Prettier Code Style

We are using [Prettier](https://prettier.io) to maintain a common code format between developers, a check is run against the solution on every Pull request, please ensure your code passes the Prettier tests before submitting a PR.

A simple way to do this is to run the command line command:

`npm run format`

## Getting started

### Download the source code

Follow the instructions above for setting up your environment, cloning the project, then from a command or terminal window, navigate to the 'src' folder and run **`npm install`** to download the dependencies.

### Build the client side project using the Development Mode

Once completed. you can run **`npm run serve-meal'** to build the solution. Once you have done this, the terminal will output the location of your code (likely localhost:8080) and you can navigate to this address in the browser of your choice for a development web server to start and automatically open the website. As you make changes to the code, this server will automatically update to show your changes. If you want to test the site on another device, you can navigate to the "Network" address on another device that's connected to the same internet network.

### Where do I put things

The `/meal-mapper` directory is where all the client side development files go:

```
/ dist -- The compiled files ready to deploy onto a web server
/ node_modules -- The Node JS package repository folder
/ public -- The source Index.html file and any non-compiled files like Robots.txt / Favicon.ico etc.
/ src
    / components -- This is where we put VueJS Single File Components
    / images -- These should be images that are generic and used across ALL skinned versions of the NC Covid Support site
    / locales -- The i18n Translation files
    / scss - The main SCSS files
    / themes - This is where all Theme specific code and media should exist
        / NCCovidSupport - The main NC Covid Support theme
            / images - Any images used by this theme
            / scss - Any theme SCSS
/ tests - All code tests
    / unit - Our unit tests
    / e2e - Any end to end tests
/ docs - All the documentation files used to drive the GitHub pages documentation    
```
