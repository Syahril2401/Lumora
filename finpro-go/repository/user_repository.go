package repository

import (
	"finpro/model"

	"gorm.io/gorm"
)

type UserRepository interface {
	Create(user *model.User) error
	FindByEmail(email string) (*model.User, error)
	FindByID(id string) (*model.User, error)
	FindAll() ([]model.User, error)
	SaveAILog(log *model.AILog) error
	GetAILogByUserID(userID string) (*model.AILog, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

func (r *userRepository) Create(user *model.User) error {
	return r.db.Create(user).Error
}

func (r *userRepository) FindByEmail(email string) (*model.User, error) {
	var user model.User
	err := r.db.Where("email = ?", email).First(&user).Error
	return &user, err
}

func (r *userRepository) FindByID(id string) (*model.User, error) {
	var user model.User
	err := r.db.First(&user, "user_id = ?", id).Error
	return &user, err
}

func (r *userRepository) FindAll() ([]model.User, error) {
	var users []model.User
	err := r.db.Find(&users).Error
	return users, err
}

func (r *userRepository) SaveAILog(log *model.AILog) error {
	return r.db.Save(log).Error
}

func (r *userRepository) GetAILogByUserID(userID string) (*model.AILog, error) {
	var log model.AILog
	err := r.db.Where("user_id = ?", userID).First(&log).Error
	if err != nil {
		return nil, err
	}
	return &log, nil
}
