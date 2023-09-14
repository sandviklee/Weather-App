# VM usage
Run in terminal all commands below:

Connect to vm:
```
ssh [din feide bruker]@it2810-37.idi.ntnu.no
```
(type "yes" if first time)

then type your feide password

Set up git (will have to type in credentials once usernama + access token):

```
sudo git config --global credential.helper store
```

clone repo:

```
sudo git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-37/prosjekt-1.git
```

now we make a script to do work for us, from ~/ write:
```
sudo touch script.sh
sudo chmod +x script.sh
sudo nano script.sh
```

in nano copy in the following:
```
#!/bin/bash
cd prosjekt-1
sudo git pull
sudo npm install
sudo npm run build
sudo rm -rf /var/www/html/project1
sudo mkdir /var/www/html/project1
sudo cp -R dist/* /var/www/html/project1
sudo service apache2 restart
```

save with Ctrl+S and exit with Ctrl+X

Now every time you want to refresh the contents of server run ```sudo ./script.sh```  from ~/ directory

Access site at: [http://it2810-37.idi.ntnu.no/project1/](http://it2810-37.idi.ntnu.no/project1/)