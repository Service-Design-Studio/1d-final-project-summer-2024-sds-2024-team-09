Given("I am on the index page") do
  visit root_path
end

Then("I should see {string}") do |content|
  expect(page).to have_content(content)
end
