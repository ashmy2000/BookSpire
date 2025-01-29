import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.blueGrey[300],
        appBar: AppBar(
          title: Text(
            "BookSpire",
            style: TextStyle(color: Colors.white),
          ),
          backgroundColor: Colors.blueGrey[900],
          centerTitle: true, // Centers the title
        ),
        body: Center(
          child: Image(
            image: NetworkImage(
              'https://www.w3schools.com/w3css/img_lights.jpg', // Working image URL
            ),
          ),
        ),
      ),
    ),
  );
}

