import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(context) {
    // Instantiate your class using Get.put() to make it available for all "child" routes there.

    return Scaffold(
      // Use Obx(()=> to update Text() whenever count is changed.
      appBar: AppBar(title: const Text("Quiz")),

      // Replace the 8 lines Navigator.push by a simple Get.to(). You don't need context
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            print("stuff");
          },
          child: Text("Button"),
        ),
      ),
    );
  }
}
