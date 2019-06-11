#!/bin/bash
set -e

JSONTMP="{\n\t\"usingComponents\": {}\n}"

if [[ -z $1 ]]; then
  echo "Enter new page name: "
  read -r PAGENAME
else
  PAGENAME=$1
fi

read -p "New page name $PAGENAME - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "New page $PAGENAME adding..."
  (
    cd src/pages
    mkdir $PAGENAME
    cd $PAGENAME
    touch "$PAGENAME.js"
    echo -e $JSONTMP > "$PAGENAME.json"
    touch "$PAGENAME.stylus"
    touch "$PAGENAME.wxml"
    # sed -i "/],/s/],/\t\"pages/$PAGENAME/$PAGENAME\"\n\t],/g" file
  )
  echo "-- adding over --"
fi