# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170427194210) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "holes", force: :cascade do |t|
    t.integer  "number"
    t.integer  "par"
    t.integer  "yards"
    t.string   "swings"
    t.integer  "putt_count"
    t.string   "score"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "score_card_id"
    t.index ["score_card_id"], name: "index_holes_on_score_card_id", using: :btree
  end

  create_table "score_cards", force: :cascade do |t|
    t.string   "course_name"
    t.string   "city"
    t.string   "state"
    t.integer  "num_of_holes"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "user_id"
    t.integer  "total_par"
    t.string   "total_score"
    t.integer  "pars",         default: [],              array: true
    t.integer  "scores",       default: [],              array: true
    t.index ["user_id"], name: "index_score_cards_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "firstname"
    t.string   "lastname"
    t.string   "username"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
