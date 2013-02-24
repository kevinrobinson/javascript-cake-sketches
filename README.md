# The Cake Pattern in CoffeeScript/CommonJS

Playing around to understand Scala's cake pattern in CoffeeScript.  It's different without the static typing, but just trying to understand the ideas here, mostly from http://jonasboner.com/2008/10/06/real-world-scala-dependency-injection-di/.

It seems to me like the key parts are:
  
  - wrapping classes up into modules
  - modules explicitly declare the class' dependencies using abstract member fields
  - the cake object is the object where all dependencies get mixed into
  - if multiple modules require the same type of object and use the same name, they would share an instance (same as any other service registry)
  - classes wrapped in modules need a way to refer to the injected depenencies.  In the Scala implementation these are closed over, but here in JavaScript we can't assign to a closed over variable from the outside.  So each component is defined as a function that takes a reference to the cake, so that each class in the module has access to the cake reference.


## License
The MIT license.

Copyright (c) 2013 Kevin Robinson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
