### **[Midaetalk] 기술 요구사항 명세서 (TRD) - v2.0 MVP Core**

이 문서는 '미대톡' 프로젝트의 MVP(최소 기능 제품) 개발을 위한 기술적 요구사항을 정의합니다. PRD v2.0에 명시된 기능을 구현하기 위한 기술 스택, 아키텍처, 데이터 모델, 그리고 각 기능별 기술적 구현 방안을 상세히 다룹니다.

### **1. 시스템 아키텍처 (System Architecture)**

본 프로젝트는 서버리스(Serverless) 아키텍처를 기반으로 하며, 클라이언트(프론트엔드)가 BaaS(Backend as a Service)인 Supabase와 직접 통신하는 구조를 채택합니다.

*   **프론트엔드 (Client):** Next.js를 사용한 웹 애플리케이션.
*   **백엔드 (Backend):** Supabase가 제공하는 서비스를 백엔드로 활용.
    *   **인증 (Authentication):** Supabase Auth
    *   **데이터베이스 (Database):** Supabase Postgres DB
    *   **파일 스토리지 (Storage):** Supabase Storage
*   **관리자 (Admin):** 별도의 관리자 페이지 개발 없이 Supabase 대시보드를 직접 활용.

### **2. 기술 스택 (Technology Stack)**

| 구분 | 기술 | 버전/사양 | 주요 활용 목적 |
| :--- | :--- | :--- | :--- |
| **프론트엔드** | Next.js | 13+ (App Router) | UI 렌더링, 클라이언트 로직 처리, 서버 사이드 렌더링(SSR) |
| **백엔드** | Supabase | - | 인증, 데이터베이스, 스토리지 등 백엔드 기능 전체 |
| **인증** | Supabase Auth | - | 이메일 기반 회원가입, 로그인, 세션 관리 |
| **데이터베이스** | Supabase Postgres | - | 사용자 정보, 게시물, 피드백 등 데이터 저장 및 관리 |
| **스토리지** | Supabase Storage | - | 작품 이미지, 멘토 인증 서류 등 정적 파일 저장 |
| **UI 라이브러리**| (선택) | Tailwind CSS 등 | 빠른 UI 개발 및 일관된 디자인 시스템 구축 |
| **상태 관리** | (선택) | Zustand, Jotai 등 | 클라이언트 상태 관리 (필요시 도입) |

### **3. 데이터 모델 (Database Schema)**

Supabase Postgres DB에 생성될 테이블과 컬럼 구조는 다음과 같습니다.

#### **3.1. `users` (Supabase Auth 연동)**

Supabase Auth의 `auth.users` 테이블과 `id`를 기준으로 1:1 관계를 맺는 공개(`public`) 스키마의 프로필 테이블입니다.

| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Foreign Key (auth.users.id) | 사용자 고유 ID |
| `created_at` | `timestamp with time zone` | Not Null, Default `now()` | 생성 일시 |
| `name` | `text` | Not Null | 사용자 이름 |
| `role` | `text` | Not Null, Check (`student`, `mentor`) | 사용자 역할 ('학생' 또는 '멘토') |
| `is_verified` | `boolean` | Not Null, Default `false` | 멘토 인증 여부 |

*   **참고:** `role` 정보는 가입 시점에 `users` 테이블에 저장하며, Supabase Auth의 `user_metadata`에도 백업/중복 저장하여 Row Level Security(RLS) 정책에 활용할 수 있습니다.

#### **3.2. `posts` (작품 게시물)**

| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | Primary Key, Identity | 게시물 고유 ID |
| `created_at` | `timestamp with time zone` | Not Null, Default `now()` | 생성 일시 |
| `title` | `text` | Not Null | 작품 제목 |
| `description` | `text` | | 작품 설명 |
| `image_url` | `text` | Not Null | 작품 이미지 URL (Supabase Storage 경로) |
| `user_id` | `uuid` | Not Null, Foreign Key (`users.id`) | 작성자 ID |

#### **3.3. `feedbacks` (피드백 댓글)**

| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | Primary Key, Identity | 피드백 ID |
| `created_at` | `timestamp with time zone` | Not Null, Default `now()` | 생성 일시 |
| `content` | `text` | Not Null | 피드백 내용 |
| `post_id` | `bigint` | Not Null, Foreign Key (`posts.id`) | 대상 작품 ID |
| `user_id` | `uuid` | Not Null, Foreign Key (`users.id`) | 작성자 ID |

#### **3.4. `mentor_verifications` (멘토 인증 서류)**

| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | Primary Key, Identity | 인증 요청 ID |
| `created_at` | `timestamp with time zone`| Not Null, Default `now()` | 제출 일시 |
| `file_url` | `text` | Not Null | 인증 서류 파일 URL (Supabase Storage 경로) |
| `user_id` | `uuid` | Not Null, Unique, Foreign Key (`users.id`) | 제출한 멘토 ID (한 명당 하나의 요청만 가능) |
| `status` | `text` | Not Null, Default `pending` | 상태 ('pending', 'approved', 'rejected') - MVP에서는 관리자 확인용 |

### **4. 기능별 기술 명세 (Feature Specifications)**

#### **F-01: 역할 기반 계정 (Role-Based Account)**
*   **인증:** Supabase Auth의 이메일/비밀번호 기반 가입(`signUp`) 기능을 사용합니다.
*   **역할 저장:**
    1.  가입 시 프론트엔드에서 '학생' 또는 '멘토' 역할을 선택받습니다.
    2.  `signUp` 메소드 호출 시 `options.data` 객체에 `{ role: 'student' | 'mentor', name: '...' }` 와 같이 추가 정보를 전달합니다.
    3.  이 정보는 `auth.users`의 `raw_user_meta_data`에 저장됩니다.
    4.  데이터베이스 트리거(`trigger`)를 설정하여, `auth.users`에 새로운 레코드가 삽입될 때 `raw_user_meta_data`의 정보를 `public.users` 테이블에 자동으로 복사(INSERT)합니다.

#### **F-02: 작품 업로드 (Artwork Upload)**
*   **Actor:** `role`이 '학생'인 사용자. (프론트엔드에서 UI 분기 처리, 백엔드 RLS 정책으로 강화)
*   **프로세스:**
    1.  사용자가 이미지 파일을 선택하고 제목, 설명을 입력합니다.
    2.  클라이언트에서 Supabase JS Client의 `storage.from('artworks').upload()`를 호출하여 이미지를 업로드합니다.
    3.  업로드 성공 시 반환되는 `path`를 이용하여 `storage.from('artworks').getPublicUrl()`로 public URL을 생성합니다.
    4.  `posts` 테이블에 제목, 설명, 이미지 public URL, 현재 로그인된 사용자 ID를 포함하여 새로운 행을 삽입(INSERT)합니다.

#### **F-03: 작품 갤러리 (Artwork Gallery)**
*   **데이터 조회:** `posts` 테이블의 모든 레코드를 `created_at` 기준으로 내림차순(`descending`) 정렬하여 조회합니다.
*   **레이아웃:** CSS Grid 또는 Flexbox를 사용하여 그리드 레이아웃을 구현합니다.
*   **페이지네이션/무한 스크롤:** 초기 로드 시에는 상위 N개(예: 20개)의 게시물만 가져오고, 스크롤이 하단에 도달하면 다음 페이지의 데이터를 요청하여 렌더링하는 방식으로 성능을 최적화합니다.

#### **F-04: 텍스트 피드백 (Text Feedback)**
*   **데이터 조회:** 작품 상세 페이지 진입 시, 해당 `post_id`를 기준으로 `feedbacks` 테이블에서 모든 댓글을 조회합니다. 작성자 정보(`users` 테이블의 `name`, `role`, `is_verified`)를 함께 가져오기 위해 `JOIN` 쿼리를 사용합니다.
*   **데이터 생성:** 사용자가 댓글을 작성하고 제출하면, `feedbacks` 테이블에 내용(`content`), `post_id`, 현재 로그인된 `user_id`를 포함하여 새로운 행을 삽입(INSERT)합니다.

#### **F-05: 개인 포트폴리오 (Personal Portfolio)**
*   **데이터 조회:** `posts` 테이블에서 현재 로그인된 사용자의 `user_id`와 일치하는 모든 레코드를 `created_at` 기준으로 내림차순 정렬하여 조회합니다.

#### **F-06: 기본 프로필 (Basic Profile)**
*   **데이터 조회:** `users` 테이블에서 특정 `user_id`에 해당하는 레코드를 조회하여 이름과 역할을 표시합니다.
*   **인증 멘토 배지:** 해당 유저의 `is_verified` 컬럼 값이 `true`일 경우, 프론트엔드에서 조건부 렌더링으로 '인증 멘토' 배지를 표시합니다.

#### **F-07: 멘토 인증 시스템 (Mentor Verification System)**
*   **파일 업로드 (멘토):**
    1.  Actor의 `role`이 '멘토'인 경우에만 프로필 페이지에 서류 업로드 UI를 노출합니다.
    2.  사용자가 인증 서류(이미지, PDF)를 선택하면, 보안 정책이 적용된 별도의 'verifications' 버킷에 `storage.from('verifications').upload()`를 사용하여 파일을 업로드합니다. 파일 경로는 `(user_id)/(filename)` 형식으로 하여 식별이 용이하게 합니다.
    3.  업로드 성공 후, `mentor_verifications` 테이블에 `user_id`와 파일 경로(`file_url`)를 저장합니다.
*   **인증 처리 (관리자):**
    1.  관리자는 Supabase 대시보드에 직접 로그인합니다.
    2.  'Storage' 메뉴에서 'verifications' 버킷에 접근하여 제출된 서류를 확인/다운로드합니다.
    3.  'Database' 메뉴의 `mentor_verifications` 테이블을 통해 제출자 정보를 확인합니다.
    4.  검토 후, `users` 테이블에서 해당 `user_id`를 찾아 `is_verified` 컬럼의 값을 `false`에서 `true`로 수동 변경(Update)합니다.

### **5. 스토리지 정책 (Storage Policy)**

보안 및 관리를 위해 2개의 버킷을 분리하여 운영합니다.

*   **`artworks` 버킷:**
    *   **Public Access:** `true` (모든 사용자가 이미지 URL을 통해 작품을 볼 수 있도록 허용)
    *   **업로드 정책(Policy):** 로그인한 사용자 중 `role`이 '학생'인 경우에만 `INSERT`를 허용하는 RLS(Row Level Security) 정책을 설정합니다.
*   **`verifications` 버킷:**
    *   **Public Access:** `false` (개인정보 보호를 위해 기본적으로 비공개)
    *   **업로드 정책(Policy):** 로그인한 사용자 중 `role`이 '멘토'이며, 자신의 `user_id`와 일치하는 경로에만 `INSERT`를 허용하도록 RLS 정책을 설정합니다.
    *   **조회/다운로드 정책:** 관리자(service_role key 사용)만 접근 가능하도록 설정합니다.