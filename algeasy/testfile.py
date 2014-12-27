# -*- coding: utf-8 -*-
#test file


def gentext(title, bodytext):
    myText = '''
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">


<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css" />
<title>%s</title>
</head>
<body>
<div id="wrap">




<div id="topmenu">
<ul>
<li><a href="index.html">Home</a></li>
<li><a href="about.html">About</a></li>
<li><a href="contact.html">Contact</a></li>
<li><a href="resources.html">Resources</a></li>
</ul>
</div>

<div id="header">
<h1><a href="#">AlgEasy</a></h1>
<h2>Algorithms Made Easy</h2>
</div>

<div id="menu">
<ul>
<li><a href="general.html">General</a></li>
<li><a href="algorithms.html">Algorithms</a></li>
<li><a href=“webmap.html”>Site Structure</a></li>
</ul>
</div>

<div id="contentwrap"> 

<div id="content">

%s

<div style="clear: both;"> </div>
</div>

<div id="sidebar">
<h3>Menu Navigation</h3>
<ul>
<li><a href="#">Home</a></li>
</ul>


<h3>Useful Resources</h3>
<ul>
<li><a href="index.html">Home</a></li>
</ul>

</div>

<div style="clear: both;"> </div>

</div>

<div id="footer">
<p>&copy; Copyright 2014 <a href="#">Naveen Arunachalam</a> | Template by <a href="http://www.invitation.tv">Invitation Web Directory</a></p>
</div>

</div>

</body>
</html>
''' % (title, bodytext)
    return myText



a = open("genfile.txt")
lines = a.read().splitlines()
print lines
a.close()


mode = False
for i in range(len(lines)):
    line = lines[i]
    if line[0:5] == "File:":
        mode = True
        filename = line[6:].strip()
        b = open(filename, 'w')
        bodytext = ''
        title = ''
        i += 1
    elif line[0:4] == 'STOP':
        b.close()
        mode = False

    line = lines[i]

    if mode == True:
        if line[0:6] == "Title:":
            title = 'AlgEasy - ' + line[7:].strip()
        elif line[0] == '>':
            bodytext += '<h2> ' + line[1:] + ' </h2>'
        else:
            bodytext += '<p> ' + line + ' </p>'
            b.write(gentext(title, bodytext))

b.close()
