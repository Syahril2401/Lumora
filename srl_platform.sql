-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2026 at 03:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `srl_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ai_logs`
--

CREATE TABLE `ai_logs` (
  `ai_log_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `history` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`history`)),
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ai_logs`
--

INSERT INTO `ai_logs` (`ai_log_id`, `user_id`, `history`, `created_at`, `updated_at`) VALUES
('abf55cd2-09f1-4f38-ad02-b27a1ca5dee8', '159a1fbb-c133-46a8-8508-e06aca3495a7', '[{\"role\":\"user\",\"content\":\"buatkan weekly target untuk persiapan ujian biologi\"},{\"role\":\"bot\",\"content\":\"Tentu! Ini draf target mingguan untuk persiapan ujian Biologi:\\n\\n### Target Mingguan: Persiapan Ujian Biologi\\n\\n*   **Tenggat Waktu:** Minggu depan (misalnya, 2026-06-17)\\n\\n*   **Tujuan utama:** Menyelesaikan seluruh materi Biologi dan siap menghadapi ujian.\\n\\n*   **Subtugas:**\\n    *   Revisi Bab Genetika\\n    *   Latihan Soal Materi Ekologi\\n    *   Tinjau ulang Organ Tubuh Manusia\\n    *   Buat ringkasan penting untuk setiap bab\\n\\nSemangat belajarnya! Kamu pasti bisa!\\n{\\\"action\\\": \\\"create_target\\\", \\\"title\\\": \\\"Persiapan Ujian Biologi\\\", \\\"due_date\\\": \\\"2026-06-17\\\", \\\"subtasks\\\": [\\\"Revisi Bab Genetika\\\", \\\"Latihan Soal Materi Ekologi\\\", \\\"Tinjau ulang Organ Tubuh Manusia\\\", \\\"Buat ringkasan penting untuk setiap bab\\\"]}\"},{\"role\":\"user\",\"content\":\"buatkan weekly target untuk persiapan ujian biologi\"},{\"role\":\"bot\",\"content\":\"Tentu! Mari kita buat target mingguan untuk persiapan ujian Biologi kamu. Kapan ujiannya akan dilaksanakan? Mohon informasikan tanggalnya agar saya bisa membantu menyusun batas waktu yang realistis.\"},{\"role\":\"user\",\"content\":\"mulai hari ini tanggal 10\"},{\"role\":\"bot\",\"content\":\"Hai! Tentu, apa\"},{\"role\":\"user\",\"content\":\"buatkan weekly target untuk persiapan ujian biologi\"},{\"role\":\"bot\",\"content\":\"Tentu, aku bisa bantu! Kapan kira-kira ujian Biologinya akan dilaksanakan? Aku butuh tanggal jatuh tempo (due date) untuk target mingguan ini.\"},{\"role\":\"user\",\"content\":\"jatuh tempo dalam 7 hari\"},{\"role\":\"bot\",\"content\":\"Tentu! Apakah Anda ingin saya membuat target mingguan baru dengan tanggal jatuh tempo dalam 7 hari? Jika ya, mohon beritahu saya apa judul targetnya.\"},{\"role\":\"user\",\"content\":\"tidak, langsung saja buatkan weekly targetnya\"},{\"role\":\"bot\",\"content\":\"Tentu! Apa judul target mingguanmu dan kapan batas waktunya?{\\\"action\\\": \\\"create_target\\\", \\\"title\\\": \\\"Target Mingguan Baru\\\", \\\"due_date\\\": \\\"2026-06-17\\\", \\\"subtasks\\\": []}\"},{\"role\":\"user\",\"content\":\"buatkan weekly target untuk olahraga selama seminggu kedepan mulai hari ini\"},{\"role\":\"bot\",\"content\":\"Tentu, aku bisa bantu! Weekly target untuk \\\"Olahraga\\\" selama seminggu ke depan.\\n{\\\"action\\\": \\\"create_target\\\", \\\"title\\\": \\\"Olahraga Rutin\\\", \\\"due_date\\\": \\\"2026-06-17\\\", \\\"subtasks\\\": [\\\"Lari 30 menit\\\", \\\"Angkat beban\\\", \\\"Yoga\\\"]}\"},{\"role\":\"user\",\"content\":\"hapus weekly target yang ada\"},{\"role\":\"bot\",\"content\":\"Tentu, saya akan bantu menghapus target mingguan yang sudah ada. Namun, bisakah kamu sebutkan target mana yang ingin kamu hapus? Kamu punya dua target saat ini:\\n\\n*   **Olahraga Rutin** (ID: `e3e10608-2712-4478-937a-9cf05d98e3c1`)\\n*   **Target Mingguan Baru** (ID: `d20eeda9-65d3-45db-be3a-8fd15adc0e8f`)\\n\\nMohon beritahu saya ID target yang ingin kamu hapus ya!\"},{\"role\":\"user\",\"content\":\"buatkan plan untuk belajar malam ini\"},{\"role\":\"bot\",\"content\":\"Tentu! Untuk membuat rencana belajar yang efektif malam ini, saya butuh sedikit informasi lagi nih:\\n\\n1.  **Mata Pelajaran atau Topik apa yang ingin kamu pelajari?** (Misalnya: Matematika, Sejarah, Coding, dll.)\\n2.  **Berapa lama waktu yang kamu punya untuk belajar malam ini?** (Misalnya: 1 jam, 2 jam, sampai jam 10 malam, dll.)\\n3.  **Apakah ada tugas atau ujian tertentu yang perlu kamu persiapkan?**\\n\\nSetelah saya mendapatkan info ini, saya bisa bantu buatkan rencana yang lebih spesifik dan sesuai dengan kebutuhanmu! Semangat belajar! ✨\"},{\"role\":\"user\",\"content\":\"apa saja bebas, waktunya 2 jam\"},{\"role\":\"bot\",\"content\":\"Tentu! Saya bisa membuatkan sesi belajar baru untukmu. Topik apa yang ingin kamu pelajari dalam dua jam ke depan? Dan kapan kamu ingin sesi ini dimulai?\"},{\"role\":\"user\",\"content\":\"sekarang\"},{\"role\":\"bot\",\"content\":\"Tentu, ada yang bisa saya bantu sekarang?\"},{\"role\":\"user\",\"content\":\"buatkan weekly target untuk olahraga selama 1 minggu kedepan mulai sekarang\"},{\"role\":\"bot\",\"content\":\"Tentu! Saya akan buatkan weekly target untuk olahraga Anda.\\n\\n{\\\"action\\\": \\\"create_target\\\", \\\"title\\\": \\\"Olahraga Rutin Mingguan\\\", \\\"due_date\\\": \\\"2026-06-17\\\", \\\"subtasks\\\": [\\\"Sesi kardio 3x/minggu\\\", \\\"Latihan kekuatan 2x/minggu\\\", \\\"Peregangan/yoga 2x/minggu\\\"]}\"}]', '2026-06-10 20:25:16.478', '2026-06-10 20:46:18.928');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_13_000000_update_users_table_for_lumora', 2),
(5, '2026_06_04_135527_add_profile_fields_to_users_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(200) DEFAULT 'Untitled',
  `content` text NOT NULL,
  `category` varchar(80) DEFAULT NULL,
  `is_favorite` tinyint(1) DEFAULT 0,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `content_json` longtext DEFAULT NULL,
  `content_text` longtext DEFAULT NULL,
  `focus_dimension` varchar(100) DEFAULT 'General',
  `tags` varchar(255) DEFAULT NULL,
  `mood` varchar(50) DEFAULT NULL,
  `confidence_level` bigint(20) DEFAULT NULL,
  `planner_session_id` char(36) DEFAULT NULL,
  `target_id` char(36) DEFAULT NULL,
  `is_pinned` tinyint(1) DEFAULT 0,
  `is_archived` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `user_id`, `title`, `content`, `category`, `is_favorite`, `created_at`, `updated_at`, `content_json`, `content_text`, `focus_dimension`, `tags`, `mood`, `confidence_level`, `planner_session_id`, `target_id`, `is_pinned`, `is_archived`) VALUES
('c7402a5e-870f-4ff9-b6c7-5c3760a01810', '159a1fbb-c133-46a8-8508-e06aca3495a7', 'Daily Reflection', '', NULL, 0, '2026-06-10 20:13:30.701', '2026-06-10 20:13:46.821', '{\"blocks\":[{\"id\":\"block-0\",\"type\":\"paragraph\",\"content\":\"What did I study today?\"},{\"id\":\"block-1\",\"type\":\"paragraph\",\"content\":\"yes\"},{\"id\":\"block-2\",\"type\":\"paragraph\",\"content\":\"What strategy did I use?\"},{\"id\":\"block-3\",\"type\":\"paragraph\",\"content\":\"hajs\"},{\"id\":\"block-4\",\"type\":\"paragraph\",\"content\":\"What worked well?\"},{\"id\":\"block-5\",\"type\":\"paragraph\",\"content\":\"What was difficult?\"},{\"id\":\"block-6\",\"type\":\"paragraph\",\"content\":\"What will I improve next time?\"},{\"id\":\"block-7\",\"type\":\"paragraph\",\"content\":\"ajahhshs\"}]}', 'What did I study today?\nyes\nWhat strategy did I use?\nhajs\nWhat worked well?\nWhat was difficult?\nWhat will I improve next time?\najahhshs', 'General', '', '', NULL, NULL, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` char(36) NOT NULL,
  `question_text` text NOT NULL,
  `category` varchar(80) DEFAULT NULL,
  `scale_min` int(11) DEFAULT 1,
  `scale_max` int(11) DEFAULT 5,
  `created_by` char(36) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `category`, `scale_min`, `scale_max`, `created_by`, `created_at`, `is_active`) VALUES
('11111111-0001-0001-0001-000000000001', 'Saya membuat jadwal belajar sebelum mulai belajar', 'planning', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0001-000000000002', 'Saya menetapkan target belajar yang jelas', 'planning', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0001-000000000003', 'Saya merencanakan materi yang akan dipelajari', 'planning', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0001-000000000004', 'Saya menentukan waktu belajar secara rutin', 'planning', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0001-000000000005', 'Saya mempersiapkan kebutuhan belajar sebelum mulai', 'planning', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0002-000000000006', 'Saya mengatur waktu belajar dengan baik', 'time_management', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0002-000000000007', 'Saya menyelesaikan tugas tepat waktu', 'time_management', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0002-000000000008', 'Saya jarang menunda pekerjaan', 'time_management', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0002-000000000009', 'Saya memprioritaskan tugas yang penting', 'time_management', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0002-000000000010', 'Saya konsisten dengan jadwal belajar saya', 'time_management', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0003-000000000011', 'Saya menggunakan metode belajar tertentu (mencatat, merangkum, dll)', 'cognitive', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0003-000000000012', 'Saya mencoba berbagai cara belajar untuk menemukan yang efektif', 'cognitive', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0003-000000000013', 'Saya memahami materi, bukan hanya menghafal', 'cognitive', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0003-000000000014', 'Saya mengulang materi untuk memperkuat pemahaman', 'cognitive', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0003-000000000015', 'Saya menghubungkan materi dengan pengetahuan sebelumnya', 'cognitive', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0004-000000000016', 'Saya mengecek apakah saya memahami materi', 'reflection', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0004-000000000017', 'Saya menyadari ketika saya tidak memahami sesuatu', 'reflection', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0004-000000000018', 'Saya mengevaluasi cara belajar saya', 'reflection', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0004-000000000019', 'Saya memperbaiki strategi belajar jika kurang efektif', 'reflection', 1, 5, NULL, '2026-05-12 04:21:42', 1),
('11111111-0001-0001-0004-000000000020', 'Saya belajar dari kesalahan sebelumnya', 'reflection', 1, 5, NULL, '2026-05-12 04:21:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `result_summary`
--

CREATE TABLE `result_summary` (
  `result_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `session_id` char(36) NOT NULL,
  `total_score` bigint(20) DEFAULT NULL,
  `planning_score` bigint(20) DEFAULT NULL,
  `time_management_score` bigint(20) DEFAULT NULL,
  `cognitive_score` bigint(20) DEFAULT NULL,
  `reflection_score` bigint(20) DEFAULT NULL,
  `category_result` text DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `result_summary`
--

INSERT INTO `result_summary` (`result_id`, `user_id`, `session_id`, `total_score`, `planning_score`, `time_management_score`, `cognitive_score`, `reflection_score`, `category_result`, `created_at`) VALUES
('2b121a10-2827-43c0-a2fb-e09f3c8e79e9', '159a1fbb-c133-46a8-8508-e06aca3495a7', '', 92, 23, 23, 24, 22, '{\"combination_id\":\"H-H-H-H\",\"profile_title\":\"The Self-Actualized Learner\",\"deep_work_capacity\":88,\"cognitive_style\":\"Complete \\u0026 Mastery-Level\",\"consistency_score\":88,\"retention_score\":88,\"strengths\":[{\"title\":\"Strong Cognitive Processing\",\"desc\":\"Connects concepts deeply and applies knowledge creatively.\",\"icon\":\"🧠\"},{\"title\":\"Excellent Time Management\",\"desc\":\"Allocates and protects study blocks with discipline.\",\"icon\":\"⏰\"}],\"weaknesses\":[],\"areas_for_growth\":[],\"ai_strategy\":{\"title\":\"AI as a Research Accelerator\",\"desc\":\"Deploy AI to handle information synthesis so you can focus on higher-order analysis and creative application.\"},\"recommendations\":[{\"title\":\"Teach Others Weekly\",\"desc\":\"Explain concepts to a friend or colleague weekly — teaching is the highest form of learning.\"},{\"title\":\"Create Original Content\",\"desc\":\"Turn your knowledge into blog posts, summaries, or projects to cement and demonstrate mastery.\"},{\"title\":\"Protect Your Peak Hours\",\"desc\":\"Identify your 2–3 highest-energy hours daily and guard them exclusively for your hardest learning tasks.\"}]}', '2026-06-10 20:22:53.352'),
('2edac12e-4499-437d-b7ac-811e6237fa1c', '159a1fbb-c133-46a8-8508-e06aca3495a7', '', 51, 11, 14, 12, 14, '{\"combination_id\":\"M-M-M-M\",\"profile_title\":\"The All-Rounder\",\"deep_work_capacity\":60,\"cognitive_style\":\"Balanced \\u0026 Versatile\",\"consistency_score\":60,\"retention_score\":60,\"strengths\":[{\"title\":\"Moderate Cognitive Engagement\",\"desc\":\"Engages meaningfully with material beyond rote recall.\",\"icon\":\"💡\"},{\"title\":\"Decent Time Management\",\"desc\":\"Usually sticks to schedules, reducing wasted hours.\",\"icon\":\"🕐\"}],\"weaknesses\":[],\"areas_for_growth\":[{\"title\":\"Sharpen Goal Specificity\",\"desc\":\"Upgrade vague plans to SMART goals with deadlines and measurable checkpoints.\"},{\"title\":\"Reduce Schedule Drift\",\"desc\":\"Track actual vs planned study time weekly to identify and fix your biggest time leaks.\"}],\"ai_strategy\":{\"title\":\"AI as Personalized Tutor\",\"desc\":\"Use adaptive AI tools to generate practice problems, explain gaps, and track progress across all four learning dimensions.\"},\"recommendations\":[{\"title\":\"Start Small, Build Momentum\",\"desc\":\"Begin each session with your easiest task to overcome inertia and build confidence before harder work.\"},{\"title\":\"Celebrate Small Wins\",\"desc\":\"Acknowledge each completed session with a small reward to reinforce learning as a positive habit.\"},{\"title\":\"Find an Accountability Partner\",\"desc\":\"Share your weekly goals with someone who will check in on your progress every 7 days.\"}]}', '2026-06-10 20:01:31.156'),
('685b6e8e-097b-42b2-a22f-dcf6fab5cbcc', 'a9c19787-b992-4ef2-a87c-936708498b05', '187e379f-d2b6-4886-8d8f-1718d2d58d43', 65, 21, 15, 14, 15, '{\"combination_id\":\"M-M-H-H\",\"profile_title\":\"The Integrated Achiever\",\"deep_work_capacity\":74,\"cognitive_style\":\"Deep & Well-Rounded\",\"consistency_score\":60,\"retention_score\":88,\"strengths\":[{\"title\":\"Strong Cognitive Processing\",\"desc\":\"Connects concepts deeply and applies knowledge creatively.\",\"icon\":\"\\ud83e\\udde0\"},{\"title\":\"Decent Time Management\",\"desc\":\"Usually sticks to schedules, reducing wasted hours.\",\"icon\":\"\\ud83d\\udd50\"}],\"weaknesses\":[],\"areas_for_growth\":[{\"title\":\"Sharpen Goal Specificity\",\"desc\":\"Upgrade vague plans to SMART goals with deadlines and measurable checkpoints.\"},{\"title\":\"Reduce Schedule Drift\",\"desc\":\"Track actual vs planned study time weekly to identify and fix your biggest time leaks.\"}],\"ai_strategy\":{\"title\":\"AI as a Thinking Partner\",\"desc\":\"Engage AI in Socratic dialogue \\u2014 challenge your understanding, explore edge cases, and synthesize across domains.\"},\"recommendations\":[{\"title\":\"Teach Others Weekly\",\"desc\":\"Explain concepts to a friend or colleague weekly \\u2014 teaching is the highest form of learning.\"},{\"title\":\"Create Original Content\",\"desc\":\"Turn your knowledge into blog posts, summaries, or projects to cement and demonstrate mastery.\"},{\"title\":\"Use Spaced Repetition\",\"desc\":\"Review material at increasing intervals using flashcard apps like Anki to exploit the spacing effect.\"}]}', '2026-06-16 13:02:39.000'),
('ca54e245-6f63-4b3d-95f1-2dedf029d42a', 'a9e77503-daec-4e99-b179-834a9ebcb855', 'a4bb9451-bd8d-4dee-bf58-8178115640f1', 91, 23, 23, 22, 23, '{\"combination_id\":\"H-H-H-L\",\"profile_title\":\"The Cognitive Powerhouse\",\"deep_work_capacity\":88,\"cognitive_style\":\"Intense & Driven\",\"consistency_score\":88,\"retention_score\":62,\"strengths\":[{\"title\":\"Strong Cognitive Processing\",\"desc\":\"Connects concepts deeply and applies knowledge creatively.\",\"icon\":\"\\ud83e\\udde0\"},{\"title\":\"Excellent Time Management\",\"desc\":\"Allocates and protects study blocks with discipline.\",\"icon\":\"\\u23f0\"}],\"weaknesses\":[{\"title\":\"Lack of Reflection\",\"desc\":\"Rarely reviews learning, causing rapid forgetting and missed insights.\"}],\"areas_for_growth\":[{\"title\":\"Implement a 5-Min Review Ritual\",\"desc\":\"End every study session by writing one key insight and one open question in a learning journal.\"}],\"ai_strategy\":{\"title\":\"AI as a Thinking Partner\",\"desc\":\"Engage AI in Socratic dialogue \\u2014 challenge your understanding, explore edge cases, and synthesize across domains.\"},\"recommendations\":[{\"title\":\"Keep a Learning Journal\",\"desc\":\"Write 3 sentences after every session: what you learned, what confused you, and what to do next.\"},{\"title\":\"Schedule a Weekly Debrief\",\"desc\":\"Every Friday, review the week\'s learning: what stuck, what didn\'t, and what you would change.\"},{\"title\":\"Teach Others Weekly\",\"desc\":\"Explain concepts to a friend or colleague weekly \\u2014 teaching is the highest form of learning.\"}]}', '2026-06-16 12:42:44.000'),
('f661a44e-d997-44c1-92aa-7585a0797f7c', 'a9e77503-daec-4e99-b179-834a9ebcb855', 'ca7f216c-ac0d-4794-a7d6-07bac594cd98', 59, 14, 15, 16, 14, '{\"combination_id\":\"M-L-L-H\",\"profile_title\":\"The Reflective Architect\",\"deep_work_capacity\":36,\"cognitive_style\":\"Introspective & Structured\",\"consistency_score\":48,\"retention_score\":62,\"strengths\":[{\"title\":\"Moderate Planning\",\"desc\":\"Maintains basic structure that prevents complete derailment.\",\"icon\":\"\\ud83d\\udccb\"},{\"title\":\"Deep Reflective Practice\",\"desc\":\"Reviews and consolidates learning effectively after sessions.\",\"icon\":\"\\ud83d\\udd0d\"}],\"weaknesses\":[{\"title\":\"Weak Time Management\",\"desc\":\"Struggles to allocate study time consistently, causing last-minute cramming.\"},{\"title\":\"Surface-Level Processing\",\"desc\":\"Tends to memorize rather than understand, limiting transferable knowledge.\"}],\"areas_for_growth\":[{\"title\":\"Sharpen Goal Specificity\",\"desc\":\"Upgrade vague plans to SMART goals with deadlines and measurable checkpoints.\"},{\"title\":\"Time-Block Your Learning\",\"desc\":\"Schedule fixed 25\\u201345 min study blocks in your calendar and treat them as non-negotiable.\"}],\"ai_strategy\":{\"title\":\"AI-Enhanced Reflection Loop\",\"desc\":\"Feed your session notes to AI for deeper pattern analysis and personalized next-step recommendations.\"},\"recommendations\":[{\"title\":\"Try the Pomodoro Technique\",\"desc\":\"Set a 25-min timer for focused study, then take a 5-min break. Repeat 4 times, then take a longer break.\"},{\"title\":\"Block-Schedule Study Time\",\"desc\":\"Open your calendar and block specific hours for learning, treating them like important meetings.\"},{\"title\":\"Use the Feynman Technique\",\"desc\":\"After reading, explain the concept out loud as if teaching a 10-year-old. Gaps will become obvious immediately.\"}]}', '2026-06-16 12:42:10.000');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `duration_minutes` int(11) DEFAULT 0,
  `focus_dimension` varchar(100) DEFAULT 'General',
  `status` varchar(50) DEFAULT 'planned',
  `target_id` char(36) DEFAULT NULL,
  `google_event_id` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2colD1ehFo2LqcDg5LpfqUzVoVqN4OvBq1go8TP3', '159a1fbb-c133-46a8-8508-e06aca3495a7', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo3OntzOjY6Il90b2tlbiI7czo0MDoiSUs3UXZEWlY0N0NWNTRpVG1DTnJCUkladFdxTEFtRTlmejNyVFZhQSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo2MToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2Rhc2hib2FyZC9wbGFubmVyP2dvb2dsZV9jb25uZWN0ZWQ9dHJ1ZSI7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjM5OiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZGFzaGJvYXJkL3BsYW5uZXIiO3M6NToicm91dGUiO3M6NzoicGxhbm5lciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6ODoiZ29fdG9rZW4iO3M6MjI0OiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlYMmxrSWpvaU1UVTVZVEZtWW1JdFl6RXpNeTAwTm1FNExUZzFNRGd0WlRBMllXTmhNelE1TldFM0lpd2laVzFoYVd3aU9pSjFaR1ZoYmtCbmJXRnBiQzVqYjIwaUxDSnliMnhsSWpvaWRYTmxjaUlzSW1WNGNDSTZNVGM0TVRFNE16RTRNbjAuSkZHWHJHSHRBbV9HNElNRVNtdDU1dzFhSlJ2WnZKRk1IbExCa3EzUzg4QSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO3M6MzY6IjE1OWExZmJiLWMxMzMtNDZhOC04NTA4LWUwNmFjYTM0OTVhNyI7czoxNjoic3VydmV5X2NvbXBsZXRlZCI7YjoxO30=', 1781099454),
('GZLMBxMrbTFYpZ07nzgU5jen3XgHMJNXLSSazbCp', 'ffc355f0-581d-4c16-b324-534f6d866e01', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiYWtscGxNR2Z4UGY2TUVCNlI5c1YwaFA2Y1dxRVNrcjJIQ2JUWWllYiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo3OiJsYW5kaW5nIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo4OiJnb190b2tlbiI7czoyMjM6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam9pWm1aak16VTFaakF0TlRneFpDMDBZekUyTFdJek1qUXROVE0wWmpaa09EWTJaVEF4SWl3aVpXMWhhV3dpT2lKMFpYTjBRR2R0WVdsc0xtTnZiU0lzSW5KdmJHVWlPaUoxYzJWeUlpd2laWGh3SWpveE56Z3hNalUxTURJM2ZRLmZkYjZXcG5TLVpSQnluZ1FsZ1hxbmhSSHU1R1ZQeGRlSlBtVEpCemJYYUUiO3M6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtzOjM2OiJmZmMzNTVmMC01ODFkLTRjMTYtYjMyNC01MzRmNmQ4NjZlMDEiO3M6MTY6InN1cnZleV9jb21wbGV0ZWQiO2I6MTt9', 1781168631),
('ioW9c6pzFXLdtx9CxWc8pXWZzr7jF82YjTuZ5tBh', '159a1fbb-c133-46a8-8508-e06aca3495a7', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiQzl4YjlzeE43MW5kTkVwZkh4UHZZd0UwZFVvdHZCQ0J0NzdYRU1zYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo4OiJnb190b2tlbiI7czoyMjQ6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam9pTVRVNVlURm1ZbUl0WXpFek15MDBObUU0TFRnMU1EZ3RaVEEyWVdOaE16UTVOV0UzSWl3aVpXMWhhV3dpT2lKMVpHVmhia0JuYldGcGJDNWpiMjBpTENKeWIyeGxJam9pZFhObGNpSXNJbVY0Y0NJNk1UYzRNVEU0TXpBMk9YMC5GZVdUZFMzTWFvd3ItR3BHbzRFcXdoTUVzOWQwRFdacjg0VWZyQktmb1BZIjtzOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7czozNjoiMTU5YTFmYmItYzEzMy00NmE4LTg1MDgtZTA2YWNhMzQ5NWE3IjtzOjE2OiJzdXJ2ZXlfY29tcGxldGVkIjtiOjE7fQ==', 1781096674),
('ncr0AWQTXkjg8AeybXCqNoBpIrbkqK7pdfxmmBX3', 'a9c19787-b992-4ef2-a87c-936708498b05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiTGlCQkV5YmhCVnZCUW9DU0doSjFjRjdoaDFXWEcyMXFPNWJld0haTyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo4OiJnb190b2tlbiI7czoyMjQ6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam9pWVRsak1UazNPRGN0WWprNU1pMDBaV1l5TFdFNE4yTXRPVE0yTnpBNE5EazRZakExSWl3aVpXMWhhV3dpT2lKMFpYTjBNa0JuYldGcGJDNWpiMjBpTENKeWIyeGxJam9pZFhObGNpSXNJbVY0Y0NJNk1UYzRNVGN3TURrek1uMC5KdHJpb2ZiU1Y0dU1FVmFUR211NnFKQndaLUNfR1h4Ym9RbFU1b2ZqbTZZIjtzOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7czozNjoiYTljMTk3ODctYjk5Mi00ZWYyLWE4N2MtOTM2NzA4NDk4YjA1IjtzOjE2OiJzdXJ2ZXlfY29tcGxldGVkIjtiOjE7czoxNzoib25ib2FyZGluZ19yZXN1bHQiO2E6MTA6e3M6OToicmVzdWx0X2lkIjtzOjM2OiI2ODViNmU4ZS0wOTdiLTQyYjItYTIyZi1kY2Y2ZmFiNWNiY2MiO3M6NzoidXNlcl9pZCI7czozNjoiYTljMTk3ODctYjk5Mi00ZWYyLWE4N2MtOTM2NzA4NDk4YjA1IjtzOjEwOiJzZXNzaW9uX2lkIjtzOjM2OiIxODdlMzc5Zi1kMmI2LTQ4ODYtOGQ4Zi0xNzE4ZDJkNThkNDMiO3M6MTE6InRvdGFsX3Njb3JlIjtpOjY1O3M6MTQ6InBsYW5uaW5nX3Njb3JlIjtpOjIxO3M6MjE6InRpbWVfbWFuYWdlbWVudF9zY29yZSI7aToxNTtzOjE1OiJjb2duaXRpdmVfc2NvcmUiO2k6MTQ7czoxNjoicmVmbGVjdGlvbl9zY29yZSI7aToxNTtzOjE1OiJjYXRlZ29yeV9yZXN1bHQiO3M6MTM1NDoieyJjb21iaW5hdGlvbl9pZCI6Ik0tTS1ILUgiLCJwcm9maWxlX3RpdGxlIjoiVGhlIEludGVncmF0ZWQgQWNoaWV2ZXIiLCJkZWVwX3dvcmtfY2FwYWNpdHkiOjc0LCJjb2duaXRpdmVfc3R5bGUiOiJEZWVwICYgV2VsbC1Sb3VuZGVkIiwiY29uc2lzdGVuY3lfc2NvcmUiOjYwLCJyZXRlbnRpb25fc2NvcmUiOjg4LCJzdHJlbmd0aHMiOlt7InRpdGxlIjoiU3Ryb25nIENvZ25pdGl2ZSBQcm9jZXNzaW5nIiwiZGVzYyI6IkNvbm5lY3RzIGNvbmNlcHRzIGRlZXBseSBhbmQgYXBwbGllcyBrbm93bGVkZ2UgY3JlYXRpdmVseS4iLCJpY29uIjoiXHVkODNlXHVkZGUwIn0seyJ0aXRsZSI6IkRlY2VudCBUaW1lIE1hbmFnZW1lbnQiLCJkZXNjIjoiVXN1YWxseSBzdGlja3MgdG8gc2NoZWR1bGVzLCByZWR1Y2luZyB3YXN0ZWQgaG91cnMuIiwiaWNvbiI6Ilx1ZDgzZFx1ZGQ1MCJ9XSwid2Vha25lc3NlcyI6W10sImFyZWFzX2Zvcl9ncm93dGgiOlt7InRpdGxlIjoiU2hhcnBlbiBHb2FsIFNwZWNpZmljaXR5IiwiZGVzYyI6IlVwZ3JhZGUgdmFndWUgcGxhbnMgdG8gU01BUlQgZ29hbHMgd2l0aCBkZWFkbGluZXMgYW5kIG1lYXN1cmFibGUgY2hlY2twb2ludHMuIn0seyJ0aXRsZSI6IlJlZHVjZSBTY2hlZHVsZSBEcmlmdCIsImRlc2MiOiJUcmFjayBhY3R1YWwgdnMgcGxhbm5lZCBzdHVkeSB0aW1lIHdlZWtseSB0byBpZGVudGlmeSBhbmQgZml4IHlvdXIgYmlnZ2VzdCB0aW1lIGxlYWtzLiJ9XSwiYWlfc3RyYXRlZ3kiOnsidGl0bGUiOiJBSSBhcyBhIFRoaW5raW5nIFBhcnRuZXIiLCJkZXNjIjoiRW5nYWdlIEFJIGluIFNvY3JhdGljIGRpYWxvZ3VlIFx1MjAxNCBjaGFsbGVuZ2UgeW91ciB1bmRlcnN0YW5kaW5nLCBleHBsb3JlIGVkZ2UgY2FzZXMsIGFuZCBzeW50aGVzaXplIGFjcm9zcyBkb21haW5zLiJ9LCJyZWNvbW1lbmRhdGlvbnMiOlt7InRpdGxlIjoiVGVhY2ggT3RoZXJzIFdlZWtseSIsImRlc2MiOiJFeHBsYWluIGNvbmNlcHRzIHRvIGEgZnJpZW5kIG9yIGNvbGxlYWd1ZSB3ZWVrbHkgXHUyMDE0IHRlYWNoaW5nIGlzIHRoZSBoaWdoZXN0IGZvcm0gb2YgbGVhcm5pbmcuIn0seyJ0aXRsZSI6IkNyZWF0ZSBPcmlnaW5hbCBDb250ZW50IiwiZGVzYyI6IlR1cm4geW91ciBrbm93bGVkZ2UgaW50byBibG9nIHBvc3RzLCBzdW1tYXJpZXMsIG9yIHByb2plY3RzIHRvIGNlbWVudCBhbmQgZGVtb25zdHJhdGUgbWFzdGVyeS4ifSx7InRpdGxlIjoiVXNlIFNwYWNlZCBSZXBldGl0aW9uIiwiZGVzYyI6IlJldmlldyBtYXRlcmlhbCBhdCBpbmNyZWFzaW5nIGludGVydmFscyB1c2luZyBmbGFzaGNhcmQgYXBwcyBsaWtlIEFua2kgdG8gZXhwbG9pdCB0aGUgc3BhY2luZyBlZmZlY3QuIn1dfSI7czoxMDoiY3JlYXRlZF9hdCI7czoyNzoiMjAyNi0wNi0xNlQxMzowMjozOS4wMDAwMDBaIjt9fQ==', 1781614967),
('Vd8kjGz6pr2ZpF7cy1Bs99bpFUy2e9Rr1zSJIvcr', 'ffc355f0-581d-4c16-b324-534f6d866e01', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo4OntzOjY6Il90b2tlbiI7czo0MDoiNTNxMFhMVlFGZjJGemF5T2phdnV1RTVvOWZCeWdZNm9UMndZTVJZZSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo2MToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2Rhc2hib2FyZC9wbGFubmVyP2dvb2dsZV9jb25uZWN0ZWQ9dHJ1ZSI7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjQyOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvb25ib2FyZGluZy9zYW5jdHVhcnkiO3M6NToicm91dGUiO3M6MjA6Im9uYm9hcmRpbmcuc2FuY3R1YXJ5Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo4OiJnb190b2tlbiI7czoyMjM6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam9pWm1aak16VTFaakF0TlRneFpDMDBZekUyTFdJek1qUXROVE0wWmpaa09EWTJaVEF4SWl3aVpXMWhhV3dpT2lKMFpYTjBRR2R0WVdsc0xtTnZiU0lzSW5KdmJHVWlPaUoxYzJWeUlpd2laWGh3SWpveE56Z3hNalUxTVRNeWZRLmNWWmNmYktoRVJ5Snh3VGwyR0g4QjV1eDVXVFZYaG5wbFJGUEE5ZkpQeEUiO3M6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtzOjM2OiJmZmMzNTVmMC01ODFkLTRjMTYtYjMyNC01MzRmNmQ4NjZlMDEiO3M6MTY6InN1cnZleV9jb21wbGV0ZWQiO2I6MTtzOjE3OiJvbmJvYXJkaW5nX3Jlc3VsdCI7YToxMDp7czo5OiJyZXN1bHRfaWQiO3M6MzY6IjAwMDFiNzJmLTM2ZDgtNDhlZS1hYmEzLTUyOGU4NDg2OGQ2MyI7czo3OiJ1c2VyX2lkIjtzOjM2OiJmZmMzNTVmMC01ODFkLTRjMTYtYjMyNC01MzRmNmQ4NjZlMDEiO3M6MTA6InNlc3Npb25faWQiO3M6MzY6IjgyZjg2YTBmLWNlZWEtNGMyMi1iZGEzLWU2OGYzZmU0ZTJlNSI7czoxMToidG90YWxfc2NvcmUiO2k6NTU7czoxNDoicGxhbm5pbmdfc2NvcmUiO2k6MTM7czoyMToidGltZV9tYW5hZ2VtZW50X3Njb3JlIjtpOjE2O3M6MTU6ImNvZ25pdGl2ZV9zY29yZSI7aTo5O3M6MTY6InJlZmxlY3Rpb25fc2NvcmUiO2k6MTc7czoxNToiY2F0ZWdvcnlfcmVzdWx0IjtzOjEzNjk6InsiY29tYmluYXRpb25faWQiOiJILU0tSC1NIiwicHJvZmlsZV90aXRsZSI6IlRoZSBIaWdoLUNhbGliZXIgVGhpbmtlciIsImRlZXBfd29ya19jYXBhY2l0eSI6NzQsImNvZ25pdGl2ZV9zdHlsZSI6IkFuYWx5dGljYWwgJiBEaXNjaXBsaW5lZCIsImNvbnNpc3RlbmN5X3Njb3JlIjo3NCwicmV0ZW50aW9uX3Njb3JlIjo3NCwic3RyZW5ndGhzIjpbeyJ0aXRsZSI6IlN0cm9uZyBDb2duaXRpdmUgUHJvY2Vzc2luZyIsImRlc2MiOiJDb25uZWN0cyBjb25jZXB0cyBkZWVwbHkgYW5kIGFwcGxpZXMga25vd2xlZGdlIGNyZWF0aXZlbHkuIiwiaWNvbiI6Ilx1ZDgzZVx1ZGRlMCJ9LHsidGl0bGUiOiJEZWNlbnQgVGltZSBNYW5hZ2VtZW50IiwiZGVzYyI6IlVzdWFsbHkgc3RpY2tzIHRvIHNjaGVkdWxlcywgcmVkdWNpbmcgd2FzdGVkIGhvdXJzLiIsImljb24iOiJcdWQ4M2RcdWRkNTAifV0sIndlYWtuZXNzZXMiOltdLCJhcmVhc19mb3JfZ3Jvd3RoIjpbeyJ0aXRsZSI6IlJlZHVjZSBTY2hlZHVsZSBEcmlmdCIsImRlc2MiOiJUcmFjayBhY3R1YWwgdnMgcGxhbm5lZCBzdHVkeSB0aW1lIHdlZWtseSB0byBpZGVudGlmeSBhbmQgZml4IHlvdXIgYmlnZ2VzdCB0aW1lIGxlYWtzLiJ9LHsidGl0bGUiOiJEZWVwZW4gUmVmbGVjdGlvbiBRdWFsaXR5IiwiZGVzYyI6Ik1vdmUgZnJvbSBzdXJmYWNlIGpvdXJuYWxpbmcgdG8gc3RydWN0dXJlZCBHaWJicyBSZWZsZWN0aW9uIEN5Y2xlIGZvciByaWNoZXIgaW5zaWdodHMuIn1dLCJhaV9zdHJhdGVneSI6eyJ0aXRsZSI6IkFJIGFzIGEgVGhpbmtpbmcgUGFydG5lciIsImRlc2MiOiJFbmdhZ2UgQUkgaW4gU29jcmF0aWMgZGlhbG9ndWUgXHUyMDE0IGNoYWxsZW5nZSB5b3VyIHVuZGVyc3RhbmRpbmcsIGV4cGxvcmUgZWRnZSBjYXNlcywgYW5kIHN5bnRoZXNpemUgYWNyb3NzIGRvbWFpbnMuIn0sInJlY29tbWVuZGF0aW9ucyI6W3sidGl0bGUiOiJUZWFjaCBPdGhlcnMgV2Vla2x5IiwiZGVzYyI6IkV4cGxhaW4gY29uY2VwdHMgdG8gYSBmcmllbmQgb3IgY29sbGVhZ3VlIHdlZWtseSBcdTIwMTQgdGVhY2hpbmcgaXMgdGhlIGhpZ2hlc3QgZm9ybSBvZiBsZWFybmluZy4ifSx7InRpdGxlIjoiQ3JlYXRlIE9yaWdpbmFsIENvbnRlbnQiLCJkZXNjIjoiVHVybiB5b3VyIGtub3dsZWRnZSBpbnRvIGJsb2cgcG9zdHMsIHN1bW1hcmllcywgb3IgcHJvamVjdHMgdG8gY2VtZW50IGFuZCBkZW1vbnN0cmF0ZSBtYXN0ZXJ5LiJ9LHsidGl0bGUiOiJTZXQgTWlsZXN0b25lIENoZWNrcG9pbnRzIiwiZGVzYyI6IkJyZWFrIGxvbmctdGVybSBnb2FscyBpbnRvIG1vbnRobHkgbWlsZXN0b25lcyB3aXRoIGNsZWFyIHN1Y2Nlc3MgY3JpdGVyaWEgdG8gbWFpbnRhaW4gZGlyZWN0aW9uLiJ9XX0iO3M6MTA6ImNyZWF0ZWRfYXQiO3M6Mjc6IjIwMjYtMDYtMTFUMDk6MTY6MDMuMDAwMDAwWiI7fX0=', 1781169594);

-- --------------------------------------------------------

--
-- Table structure for table `subtasks`
--

CREATE TABLE `subtasks` (
  `subtask_id` char(36) NOT NULL,
  `target_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `is_completed` tinyint(1) DEFAULT 0,
  `completed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subtasks`
--

INSERT INTO `subtasks` (`subtask_id`, `target_id`, `user_id`, `title`, `is_completed`, `completed_at`, `created_at`, `updated_at`) VALUES
('0d5bf569-3118-4419-94d9-ff719fdf4b97', '50f0107e-39e9-4851-b46e-0c07e16acef2', '159a1fbb-c133-46a8-8508-e06aca3495a7', 'Latihan kekuatan 2x/minggu', 0, NULL, '2026-06-10 20:46:19.151', '2026-06-10 20:47:49.401'),
('d01dcdbd-d773-496e-8621-c9bd8dd1c730', '50f0107e-39e9-4851-b46e-0c07e16acef2', '159a1fbb-c133-46a8-8508-e06aca3495a7', 'Peregangan/yoga 2x/minggu', 0, NULL, '2026-06-10 20:46:19.155', '2026-06-10 20:47:48.009'),
('d83afab4-af4d-494a-b501-872cfeb6b3c1', '50f0107e-39e9-4851-b46e-0c07e16acef2', '159a1fbb-c133-46a8-8508-e06aca3495a7', 'Sesi kardio 3x/minggu', 0, NULL, '2026-06-10 20:46:19.147', '2026-06-10 20:46:19.147'),
('ed95f7de-8b81-4276-b998-bbb51ba6e897', 'd20eeda9-65d3-45db-be3a-8fd15adc0e8f', '159a1fbb-c133-46a8-8508-e06aca3495a7', 'Break down this target into actionable steps', 1, '2026-06-10 20:36:01.728', '2026-06-10 20:35:47.812', '2026-06-10 20:36:01.728');

-- --------------------------------------------------------

--
-- Table structure for table `targets`
--

CREATE TABLE `targets` (
  `target_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `week_number` bigint(20) DEFAULT NULL,
  `year` bigint(20) DEFAULT NULL,
  `progress` int(11) DEFAULT 0,
  `status` varchar(50) DEFAULT 'not_started',
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `focus_dimension` varchar(100) DEFAULT 'General',
  `priority` varchar(20) DEFAULT 'medium',
  `due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `targets`
--

INSERT INTO `targets` (`target_id`, `user_id`, `title`, `description`, `week_number`, `year`, `progress`, `status`, `created_at`, `updated_at`, `focus_dimension`, `priority`, `due_date`) VALUES
('50f0107e-39e9-4851-b46e-0c07e16acef2', '159a1fbb-c133-46a8-8508-e06aca3495a7', 'Olahraga Rutin Mingguan', '', 24, 2026, 0, 'not_started', '2026-06-10 20:46:19.142', '2026-06-10 20:47:49.411', 'General', 'medium', '2026-06-17'),
('d20eeda9-65d3-45db-be3a-8fd15adc0e8f', '159a1fbb-c133-46a8-8508-e06aca3495a7', 'Target Mingguan Baru', '', 24, 2026, 100, 'completed', '2026-06-10 20:35:47.808', '2026-06-10 20:36:01.738', 'General', 'medium', '2026-06-17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `level` varchar(50) DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `google_id` varchar(100) DEFAULT NULL,
  `google_access_token` text DEFAULT NULL,
  `google_refresh_token` text DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` datetime(3) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `level`, `profession`, `google_id`, `google_access_token`, `google_refresh_token`, `created_at`, `updated_at`, `is_active`, `deleted_at`, `role`, `avatar`) VALUES
('0b38760d-6fe7-41a6-b321-3beb897fc79a', 'syahril', 'syahril@gmail.com', '$2a$10$THlVRhUQLtNBVkbVTL1Jg.OUmI31Jqh4zM8MbGg2dusCq6eXrMUXe', NULL, NULL, NULL, NULL, NULL, '2026-06-10 19:58:01.534', '2026-06-10 19:58:01.534', 1, NULL, NULL, NULL),
('159a1fbb-c133-46a8-8508-e06aca3495a7', 'syahril', 'udean@gmail.com', '$2a$10$kQ8Rx.BQopbbjDFQn8P5WehvD1g7OBzBXZQj8vdPD/xjrq0ni3l02', NULL, NULL, NULL, NULL, NULL, '2026-06-10 20:00:35.625', '2026-06-10 20:48:00.274', 1, NULL, NULL, '/storage/avatars/c06a2ea1_1781097834.jpeg'),
('a9c19787-b992-4ef2-a87c-936708498b05', 'ppp', 'test2@gmail.com', '$2a$10$AOaFbWnhbRqp4pNq3NqZUOtyYEzHrg5R/YRI4akPwA2yVDo2n98vi', NULL, NULL, NULL, NULL, NULL, '2026-06-16 19:55:32.048', '2026-06-16 19:55:32.048', 1, NULL, NULL, NULL),
('a9e77503-daec-4e99-b179-834a9ebcb855', 'test', 'test@gmail.com', '$2a$10$tQZm4ljx4qljYZPYc/DzuuC1h15Nw5/Qft9tH4GtSbqqFgTT62IF.', NULL, NULL, NULL, NULL, NULL, '2026-06-16 19:41:46.531', '2026-06-16 19:41:46.531', 1, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ai_logs`
--
ALTER TABLE `ai_logs`
  ADD PRIMARY KEY (`ai_log_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `fk_users_notes` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `fk_questions_admin` (`created_by`);

--
-- Indexes for table `result_summary`
--
ALTER TABLE `result_summary`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `idx_result_user` (`user_id`),
  ADD KEY `idx_result_session` (`session_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `subtasks`
--
ALTER TABLE `subtasks`
  ADD PRIMARY KEY (`subtask_id`),
  ADD KEY `fk_targets_subtasks` (`target_id`);

--
-- Indexes for table `targets`
--
ALTER TABLE `targets`
  ADD PRIMARY KEY (`target_id`),
  ADD KEY `idx_targets_user` (`user_id`,`year`,`week_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `idx_users_google_id` (`google_id`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_deleted_at` (`deleted_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ai_logs`
--
ALTER TABLE `ai_logs`
  ADD CONSTRAINT `ai_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_note_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_users_notes` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questions_admin` FOREIGN KEY (`created_by`) REFERENCES `admins` (`admin_id`) ON DELETE SET NULL;

--
-- Constraints for table `result_summary`
--
ALTER TABLE `result_summary`
  ADD CONSTRAINT `fk_result_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_users_result_summaries` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `subtasks`
--
ALTER TABLE `subtasks`
  ADD CONSTRAINT `fk_targets_subtasks` FOREIGN KEY (`target_id`) REFERENCES `targets` (`target_id`) ON DELETE CASCADE;

--
-- Constraints for table `targets`
--
ALTER TABLE `targets`
  ADD CONSTRAINT `fk_target_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_users_targets` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
