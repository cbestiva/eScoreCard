class ScoreCard < ApplicationRecord
  belongs_to :user
  has_many :holes
end
