# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts 'Started to seed the database'

(1..30).each do |i|
  name = Faker::Name.first_name
  username = "#{Faker::Name.first_name}#{i}"
  email = "foo#{i}@bar.com"
  password = 'foobar'
  user = User.new(name: name, username: username, email: email, password: password, password_confirmation: password)
  unless user.valid?
    until user.valid?
      user.name = Faker::Name.first_name
      user.username = "#{Faker::Name.first_name}#{i}"
    end
  end
  user.save
end

puts 'finished seeding the users'

(1..20).each do |i|
  name = Faker::Company.name
  logo = Faker::Company.logo
  email = "foo#{i}@bar.com"
  password = 'foobar'
  client = Client.new(company_name: name, company_logo: logo, email: email, password: password, password_confirmation: password)
  client.name = Faker::Company.name until client.valid? unless client.valid?
  client.save
end

puts 'finished seeding the clients'

(1..60).each do |_i|
  country = Faker::Nation.nationality
  city = Faker::Nation.capital_city
  desc = Faker::Lorem.paragraph
  max_capacity = rand(10..29)
  cost = rand(10..49)
  hours = rand(6..13)
  dur = rand(1..4)
  client_id = rand(1..20)
  Tour.create!(country: country, city: city, description: desc, max_capacity: max_capacity, cost: cost, hour: hours,
               duration: dur, client_id: client_id)
end

puts 'finished seeding the tours'

(1..120).each do |_i|
  user = rand(1..30)
  tour_id = rand(1..60)
  quantity = rand(1..7)
  day = Faker::Date.between(from: Date.tomorrow, to: 1.year.from_now)
  Bookedtour.create!(user_id: user, tour_id: tour_id, quantity: quantity, day: day)
end

puts 'finished seeding the bookedtours'

Apikey.create!(key: '78d2cab729f1b69ad3d2', key_confirmation: '78d2cab729f1b69ad3d2')

puts 'finished creating the API key'
