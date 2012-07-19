Asana Translate Chrome extension
================================

I asked ASANA team if they had planned to translate Asana into multiple languages.
Response was: not in roadmap. So I decided to create my own chrome extension to translate it.

Want your own language? You can help! Read below :)


How to install extension
------------------------

Choose your flavour:

**Easy as pie**

- Download from [Chrome Web Store](https://chrome.google.com/webstore/detail/mmmjfjdbamonmaajclfcpicaanaonlfc)

- Enjoy!

**Geek install**

- Download the github project

- Go to your Google Chrome extensions page or enter **chrome://extensions** into chrome url bar

- Enable developer mode.

- Click on **Load uncompressed extension**.

- Navigate to downloaded folder and open it.

- Enjoy!


Adding more languages
---------------------

You can add more languages and help the project.

Download the project and add a new file named messages.json under _locales/lang/
You can use the spanish one as template.
Finally make a pull request!


Known issues
------------

- Sometimes strings under task info are not translated at first but end up being translated after a second ajax call from Asana.
- **(fixed)** In some rare cases Asana asks to refresh page.


Author
------

**Twitter:** [@ajimix](http://twitter.com/ajimix)

**GitHub:** [github.com/ajimix](https://github.com/ajimix)


Copyright and license
---------------------

Copyright 2012 Ajimix

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.