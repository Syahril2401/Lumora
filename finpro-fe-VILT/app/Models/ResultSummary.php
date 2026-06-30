<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResultSummary extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'result_summary';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'result_id';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the primary key.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the model should be timestamped.
     * Go model uses CreatedAt only for this struct.
     * 
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'result_id',
        'user_id',
        'session_id',
        'total_score',
        'planning_score',
        'time_management_score',
        'cognitive_score',
        'reflection_score',
        'category_result',
        'created_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total_score' => 'integer',
        'planning_score' => 'integer',
        'time_management_score' => 'integer',
        'cognitive_score' => 'integer',
        'reflection_score' => 'integer',
        'created_at' => 'datetime',
    ];

    /**
     * Get the user that owns the ResultSummary.
     */
    public function user(): BelongsTo
    {
        // Based on GORM: foreignKey:UserID;references:UserID
        // Assuming User model has 'user_id' as primary key or column
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
