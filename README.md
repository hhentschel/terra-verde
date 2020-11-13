# Craft CMS 3 Starter theme

## Introduction

This is a boilderplate for Craft CMS. It consists of:

- Boilerplate Twig files
- Base CSS code
- Gulp config for compiling JS and CSS assets and running browsersync (Gulp 4 used)
- Few useful Craft config settings

## Installation

- Create project folder within local PHP server scope (e.g. XAMPP) and copy files from this boilerplate to that folder
- Use Node version **>= 12.18.3**
- Run `npm install -g gulp` if you don't have gulp
- Run `npm install` and `composer install`
- Run `craft setup` (configures local cms instance and creates .env file) or add **.env** file manually (e.g. from craft-cms-3-boilerplate) when remote cms is used. Adapt database settings in **.env** file and make sure that the following properties are set:
  -- `DEV_MODE="true"`
  -- `ROOT_URL="https://test.project-xy.zeix.com"` // remote cms instance
  -- `BASE_URL="https://test.project-xy.zeix.com"` // remote cms instance
  -- `BASE_PATH="/home/zeixcom/www/test.project-xy.zeix.com/web"` // remote cms instance
- In **config/general.php** and set `'*' => [ 'devMode' => (getenv('DEV_MODE') === "true") ? true : false, ...]` in order to use the dynamically set DEV_MODE from .env file (is set according to gulp/gulp prod tasks; see gulpfile.js).
- Save your **.env** file in **\_backup** (.env file is not within source control, files in backup folder are)

## Execute

- **Dev**: Run `gulp` (or `gulp dev`)
- **Prod**: Run `gulp prod`

## Gulpfile

Gulpfile handles **SCSS** compilation and minification, **JavaScript** minification and **browsersync**.

## Template files

Templates files are divided into four main directories: **layouts, pages, components and helpers.**

- **layouts**: base.twig (base template file with head and scripts), layout_main.twig (site layout with header, content and footer)
- **pages**: index.twig files in page folders, 404.twig
- **components**: components (e.g. pagination.twig)
- **helpers**: e.g. for macros

## Styles and Scripts

- Source SCSS and JavaScript Files are located in folder **src/styles** and **src/scripts**.
- New Scripts have to be added to **src/scripts/** and listed in **templates/\_layouts/\_includes/scripts.twig** (with type "module; e.g. `<script type="module" src="assets/scripts/modules/singleton-example.js"></script>`).
- New Styles have to be added to **src/styles/** and included in **src/styles/main.scss**.
- With `gulp` a **main.css** will be generated in **web/assets/styles** and all scripts from **src/scripts/** are copied to **web/assets/scripts** (and run with **ES6**).
- With `gulp prod` a **main.min.css** and a **main.min.js** (ES5) file will be generated in **web/assets/styles** and **web/assets/scripts**.
