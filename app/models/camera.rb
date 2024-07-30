class Camera < ApplicationRecord
  belongs_to :user
  validates :status, presence: true, inclusion: {in: ['Live', 'Not Live']}

  def go_live!
    update(status: 'Live')
  end

  def go_not_live!
    update(status: 'Not Live')
  end
end
