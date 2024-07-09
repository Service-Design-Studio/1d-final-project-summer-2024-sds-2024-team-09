// app/javascript/packs/application.js

console.log('Hello from Webpacker');

// Import Turbo and controllers (if needed for your app)
import "@hotwired/turbo-rails";
import "controllers";

import Rails from "@rails/ujs";
Rails.start();

import Turbolinks from "turbolinks";
Turbolinks.start();

import * as ActiveStorage from "@rails/activestorage";
ActiveStorage.start();

import "channels";

// Import your other JavaScript files here

