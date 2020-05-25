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
  hours = rand(8) + 6
  dur = rand(4) + 1
  client_id = rand(20) + 1
  Tour.create!(country: country, city: city, description: desc, max_capacity: max_capacity, cost: cost, hour: hours, duration: dur, client_id: client_id)
end

puts "finished seeding the tours"

for i in 1..60 do
  user = rand(20) + 1
  tour_id = rand(40) + 1
  quantity = rand(5) + 1
  day = Faker::Date.between(from: Date.today, to: 4.days.from_now)
  Bookedtour.create!(user_id: user, tour_id: tour_id, quantity: quantity, day: day)
end

puts "finished seeding the bookedtours"