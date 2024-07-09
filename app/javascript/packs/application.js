// app/javascript/packs/application.js

console.log('Hello from Webpacker');

// Import Turbo and controllers (if needed for your app)
import "@hotwired/turbo-rails";
import "controllers";

// Import Rails UJS
import Rails from "@rails/ujs";
Rails.start();

// Import Turbolinks
import Turbolinks from "turbolinks";
Turbolinks.start();

// Import Active Storage
import * as ActiveStorage from "@rails/activestorage";
ActiveStorage.start();

// Import channels if needed
import "channels";
