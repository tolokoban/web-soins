#!/bin/bash

if [ -z "$(byobu-tmux list-sessions | grep 'dev-web-soins')" ]
then
  byobu-tmux new-session -d -t 'dev-web-soins'

  byobu-tmux new-window
  byobu-tmux rename-window Consultation
  byobu-tmux send-keys -t 0 'cd ~/Code/github/cameroun' 'C-m'
  byobu-tmux send-keys -t 0 'git status' 'C-m'
  byobu-tmux split-window -h
  byobu-tmux send-keys -t 1 'cd ~/Code/github/cameroun' 'C-m'
  byobu-tmux send-keys -t 1 'npm start' 'C-m'
  byobu-tmux split-window -v
  byobu-tmux send-keys -t 2 'cd ~/Code/github/cameroun/react' 'C-m'
  byobu-tmux send-keys -t 2 'npm run watch' 'C-m'

  byobu-tmux new-window
  byobu-tmux rename-window Web-Soins
  byobu-tmux send-keys -t 0 'cd ~/Code/github/web-soins' 'C-m'
  byobu-tmux send-keys -t 0 'git status' 'C-m'
  byobu-tmux split-window -h
  byobu-tmux send-keys -t 1 'cd ~/Code/github/web-soins' 'C-m'
  byobu-tmux send-keys -t 1 'npm start' 'C-m'
  byobu-tmux split-window -v
  byobu-tmux send-keys -t 2 'cd ~/Code/github/web-soins' 'C-m'
  byobu-tmux send-keys -t 2 'npm test' 'C-m'm st
fi
# Enter byobu-tmux
byobu-tmux attach -t 'dev-web-soins'
