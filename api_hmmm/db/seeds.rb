# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Started to seed the database"

for i in 1..20 do
  name = Faker::Name.first_name
  username = "#{Faker::Name.first_name}#{i}"
  email = "foo#{i}@bar.com"
  password = "foobar"
  User.create!(name: name, username: username, email: email, password: password, password_confirmation: password)
end

puts "finished seeding the users"

for i in 1..20 do
  name = Faker::Company.name
  logo = Faker::Company.logo
  email = "foo#{i}@bar.com"
  password = "foobar"
  client = Client.new(company_name: name, company_logo: logo, email: email, password: password, password_confirmation: password)
  if client.valid?
    client.save
  end
end

puts "finished seeding the clients"

for i in 1..40 do
  country = Faker::Nation.nationality
  city = Faker::Nation.capital_city
  desc = Faker::Lorem.paragraph
  max_capacity = 10 + rand(20)
  cost = rand(40) + 10
  days = "#{rand(7)},#{rand(7)}"
  hours = "#{rand(24)},#{rand(24)}"
  dur = rand(8) + 1
  client_id = rand(20) + 1
  Tour.create!(country: country, city: city, description: desc, max_capacity: max_capacity, cost: cost, days_a_week: days, hours: hours, duration: dur, client_id: client_id)
end