#!/bin/bash

printf "\n> Instalando o front-end\n"
frontFolder="./apps/web"
cacheFolderFront="/tmp/web-cache"
rm -rf $cacheFolderFront
npm_config_loglevel=silent npm i --prefix ${frontFolder} --cache $cacheFolderFront

printf "\n> Instalando o back-end\n"
backFolder="./apps/server"
cacheFolderBack="/tmp/server-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${backFolder} --cache $cacheFolderBack