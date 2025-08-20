# 티스토리 스킨 제작 가이드

## 목차
1. [개요](#개요)
2. [스킨 구조](#스킨-구조)
3. [index.xml 설정](#indexxml-설정)
4. [치환자 사용법](#치환자-사용법)
5. [주요 치환자 레퍼런스](#주요-치환자-레퍼런스)

---

## 개요

티스토리 스킨은 블로그를 자유롭게 디자인할 수 있는 템플릿 시스템입니다. 치환자를 통해 데이터를 대입하여 동적인 웹사이트를 구성할 수 있습니다.

### 핵심 구성 요소
- **skin.html**: 메인 템플릿 파일
- **style.css**: 스타일 정의
- **script.js**: 동적 기능 구현
- **index.xml**: 스킨 설정 및 변수 정의
- **images/**: 이미지 리소스

---

## 스킨 구조

### 파일 구조
```
skin/
├── index.xml       # 스킨 정보 및 설정
├── skin.html       # HTML 템플릿
├── style.css       # 스타일시트
├── script.js       # JavaScript
└── images/         # 이미지 파일
```

### 치환자 형태

1. **값 치환자**: `[##_NAME_##]`
   - 단순 값으로 치환
   - 예: `[##_title_##]`, `[##_blogger_##]`

2. **그룹 치환자**: `<s_NAME>content</s_NAME>`
   - 조건부 렌더링
   - 데이터가 있을 때만 표시
   - 예: `<s_article_rep>`, `<s_tag>`

3. **반복 치환자**: `<s_NAME_rep>`
   - 여러 데이터를 반복 출력
   - 예: `<s_list_rep>`, `<s_rp_rep>`

---

## index.xml 설정

### 기본 구조

```xml
<?xml version="1.0" encoding="utf-8"?>
<skin>
  <!-- 스킨 정보 -->
  <information>
    <name>스킨 이름</name>
    <version>1.0</version>
    <description>스킨 설명</description>
    <license>라이선스 정보</license>
  </information>
  
  <!-- 제작자 정보 -->
  <author>
    <name>제작자명</name>
    <homepage>http://homepage.com</homepage>
    <email>email@example.com</email>
  </author>
  
  <!-- 기본 설정 -->
  <default>
    <recentEntries>5</recentEntries>
    <recentComments>5</recentComments>
    <recentTrackbacks>5</recentTrackbacks>
    <itemsOnGuestbook>10</itemsOnGuestbook>
    <tagsInCloud>30</tagsInCloud>
    <sortInCloud>3</sortInCloud>
    <expandComment>0</expandComment>
    <expandTrackback>0</expandTrackback>
    <lengthOfRecentNotice>25</lengthOfRecentNotice>
    <lengthOfRecentEntry>27</lengthOfRecentEntry>
    <lengthOfRecentComment>30</lengthOfRecentComment>
    <lengthOfRecentTrackback>30</lengthOfRecentTrackback>
    <lengthOfLink>30</lengthOfLink>
    <showListOnCategory>1</showListOnCategory>
    <showListOnArchive>1</showListOnArchive>
    <commentMessage>
      <none>댓글이 없습니다.</none>
      <single>댓글 &lt;span class="cnt"&gt;하나&lt;/span&gt; 달렸습니다.</single>
    </commentMessage>
    <trackbackMessage>
      <none>받은 트랙백이 없습니다.</none>
      <single>트랙백 &lt;span class="cnt"&gt;하나&lt;/span&gt; 받았습니다.</single>
    </trackbackMessage>
    <tree>
      <color>000000</color>
      <bgColor>ffffff</bgColor>
      <activeColor>000000</activeColor>
      <activeBgColor>eeeeee</activeBgColor>
      <labelLength>27</labelLength>
      <showValue>1</showValue>
    </tree>
    <contentWidth>500</contentWidth>
  </default>
  
  <!-- 사용자 정의 변수 -->
  <variables>
    <variablegroup>
      <label>스킨 옵션</label>
      <description>스킨 커스터마이징 옵션</description>
      
      <!-- STRING 타입 -->
      <variable>
        <name>footer-text</name>
        <label>푸터 텍스트</label>
        <description>푸터에 표시될 텍스트</description>
        <type>STRING</type>
        <default>© 2024 My Blog</default>
      </variable>
      
      <!-- SELECT 타입 -->
      <variable>
        <name>theme-mode</name>
        <label>테마 모드</label>
        <description>색상 테마 선택</description>
        <type>SELECT</type>
        <option><![CDATA[
          [
            {"name":"light", "label":"라이트 모드", "value":"light"},
            {"name":"dark", "label":"다크 모드", "value":"dark"},
            {"name":"auto", "label":"자동", "value":"auto"}
          ]
        ]]></option>
        <default>light</default>
      </variable>
      
      <!-- BOOL 타입 -->
      <variable>
        <name>show-sidebar</name>
        <label>사이드바 표시</label>
        <description>사이드바 표시 여부</description>
        <type>BOOL</type>
        <default>true</default>
      </variable>
      
      <!-- COLOR 타입 -->
      <variable>
        <name>primary-color</name>
        <label>메인 색상</label>
        <description>사이트 메인 색상</description>
        <type>COLOR</type>
        <default>#4A90E2</default>
      </variable>
      
      <!-- IMAGE 타입 -->
      <variable>
        <name>header-image</name>
        <label>헤더 이미지</label>
        <description>헤더 배경 이미지</description>
        <type>IMAGE</type>
        <default>./images/header-default.jpg</default>
      </variable>
    </variablegroup>
  </variables>
</skin>
```

### 변수 타입

| 타입 | 설명 | 사용 예시 |
|------|------|----------|
| STRING | 텍스트 입력 | 제목, 설명, URL |
| SELECT | 선택 옵션 | 테마, 레이아웃 |
| BOOL | On/Off 토글 | 기능 활성화 |
| COLOR | 색상 선택 | 테마 색상 |
| IMAGE | 이미지 URL | 배경, 로고 |

### 변수 사용법

HTML에서 변수 사용:
```html
<!-- 변수 값 출력 -->
<div class="footer-text">[##_var_footer-text_##]</div>

<!-- 조건부 표시 -->
<s_if_var_show-sidebar>
  <aside class="sidebar">
    <!-- 사이드바 내용 -->
  </aside>
</s_if_var_show-sidebar>

<!-- 색상 변수 CSS에서 사용 -->
<style>
  :root {
    --primary-color: [##_var_primary-color_##];
  }
</style>
```

---

## 치환자 사용법

### 조건문 패턴

```html
<!-- 기본 조건문 -->
<s_tag>
  <!-- 태그가 있을 때만 표시 -->
  <div class="tags">태그 목록</div>
</s_tag>

<!-- 부정 조건문 -->
<s_not_tag>
  <!-- 태그가 없을 때 표시 -->
  <div>태그가 없습니다</div>
</s_not_tag>

<!-- 중첩 조건문 -->
<s_article_rep>
  <s_article_rep_thumbnail>
    <img src="[##_article_rep_thumbnail_##]">
  </s_article_rep_thumbnail>
</s_article_rep>
```

### 반복문 패턴

```html
<!-- 기본 반복 -->
<s_list_rep>
  <article>
    <h2>[##_list_rep_title_##]</h2>
    <p>[##_list_rep_summary_##]</p>
  </article>
</s_list_rep>

<!-- 중첩 반복 -->
<s_rp_rep>
  <div class="comment">
    <p>[##_rp_rep_desc_##]</p>
    
    <!-- 대댓글 반복 -->
    <s_rp2_container>
      <s_rp2_rep>
        <div class="reply">
          [##_rp2_rep_desc_##]
        </div>
      </s_rp2_rep>
    </s_rp2_container>
  </div>
</s_rp_rep>
```

---

## 주요 치환자 레퍼런스

### 블로그 정보

| 치환자 | 설명 |
|--------|------|
| `[##_title_##]` | 블로그 제목 |
| `[##_blogger_##]` | 블로거 이름 |
| `[##_desc_##]` | 블로그 설명 |
| `[##_image_##]` | 대표 이미지 |
| `[##_blog_link_##]` | 블로그 URL |
| `[##_taglog_link_##]` | 태그 페이지 URL |
| `[##_guestbook_link_##]` | 방명록 URL |

### 리스트 페이지

| 치환자 | 설명 |
|--------|------|
| `<s_list>` | 리스트 페이지 그룹 |
| `<s_list_rep>` | 글 목록 반복 |
| `[##_list_rep_link_##]` | 글 링크 |
| `[##_list_rep_title_##]` | 글 제목 |
| `[##_list_rep_summary_##]` | 글 요약 |
| `[##_list_rep_category_##]` | 카테고리 |
| `[##_list_rep_date_##]` | 작성일 |
| `[##_list_rep_rp_cnt_##]` | 댓글 수 |

### 글 페이지

| 치환자 | 설명 |
|--------|------|
| `<s_article_rep>` | 글 페이지 그룹 |
| `[##_article_rep_title_##]` | 글 제목 |
| `[##_article_rep_desc_##]` | 글 본문 |
| `[##_article_rep_category_##]` | 카테고리 |
| `[##_article_rep_date_##]` | 작성일시 |
| `[##_article_rep_author_##]` | 작성자 |
| `<s_article_rep_thumbnail>` | 썸네일 조건부 |
| `[##_article_rep_thumbnail_##]` | 썸네일 URL |

### 댓글

| 치환자 | 설명 |
|--------|------|
| `<s_rp>` | 댓글 영역 |
| `<s_rp_container>` | 댓글 목록 컨테이너 |
| `<s_rp_rep>` | 댓글 반복 |
| `[##_rp_rep_name_##]` | 댓글 작성자 |
| `[##_rp_rep_desc_##]` | 댓글 내용 |
| `[##_rp_rep_date_##]` | 댓글 작성일 |
| `<s_rp2_container>` | 대댓글 컨테이너 |
| `<s_rp2_rep>` | 대댓글 반복 |

### 사이드바

| 치환자 | 설명 |
|--------|------|
| `<s_sidebar_element>` | 사이드바 요소 그룹 |
| `[##_category_##]` | 카테고리 (폴더형) |
| `[##_category_list_##]` | 카테고리 (리스트형) |
| `<s_rctps_rep>` | 최근 글 반복 |
| `[##_rctps_rep_title_##]` | 최근 글 제목 |
| `[##_rctps_rep_link_##]` | 최근 글 링크 |
| `<s_rctrp_rep>` | 최근 댓글 반복 |
| `[##_rctrp_rep_desc_##]` | 최근 댓글 내용 |

### 페이징

| 치환자 | 설명 |
|--------|------|
| `<s_paging>` | 페이징 영역 |
| `<s_paging_rep>` | 페이지 번호 반복 |
| `[##_paging_rep_link_##]` | 페이지 링크 |
| `[##_prev_page_##]` | 이전 페이지 |
| `[##_next_page_##]` | 다음 페이지 |

### 검색

| 치환자 | 설명 |
|--------|------|
| `<s_search>` | 검색 폼 영역 |
| `[##_search_name_##]` | 검색 입력 name |
| `[##_search_text_##]` | 검색어 |
| `[##_search_onclick_submit_##]` | 검색 실행 이벤트 |

### 태그

| 치환자 | 설명 |
|--------|------|
| `<s_tag>` | 태그 영역 |
| `<s_tag_rep>` | 태그 반복 |
| `[##_tag_name_##]` | 태그명 |
| `[##_tag_link_##]` | 태그 링크 |
| `[##_tag_cnt_##]` | 태그 글 수 |

### 방명록

| 치환자 | 설명 |
|--------|------|
| `<s_guest>` | 방명록 영역 |
| `<s_guest_rep>` | 방명록 항목 반복 |
| `[##_guest_rep_name_##]` | 작성자 |
| `[##_guest_rep_desc_##]` | 내용 |
| `[##_guest_rep_date_##]` | 작성일 |

---

## 실전 예제

### 반응형 리스트 페이지

```html
<s_list>
  <div class="container">
    <h1 class="page-title">[##_list_conform_##]</h1>
    
    <s_list_empty>
      <div class="empty-message">
        <p>아직 작성된 글이 없습니다.</p>
      </div>
    </s_list_empty>
    
    <div class="post-grid">
      <s_list_rep>
        <article class="post-card">
          <s_list_rep_thumbnail>
            <div class="post-thumbnail">
              <img src="[##_list_rep_thumbnail_##]" alt="">
            </div>
          </s_list_rep_thumbnail>
          
          <div class="post-content">
            <h2 class="post-title">
              <a href="[##_list_rep_link_##]">[##_list_rep_title_##]</a>
            </h2>
            
            <div class="post-meta">
              <span class="category">[##_list_rep_category_##]</span>
              <time>[##_list_rep_date_##]</time>
              <span class="comments">댓글 [##_list_rep_rp_cnt_##]</span>
            </div>
            
            <p class="post-summary">[##_list_rep_summary_##]</p>
          </div>
        </article>
      </s_list_rep>
    </div>
    
    <s_paging>
      <nav class="pagination">
        <a [##_prev_page_##] class="prev">이전</a>
        <s_paging_rep>
          <a [##_paging_rep_link_##] class="page-num">[##_paging_rep_link_num_##]</a>
        </s_paging_rep>
        <a [##_next_page_##] class="next">다음</a>
      </nav>
    </s_paging>
  </div>
</s_list>
```

### 댓글 시스템

```html
<s_rp>
  <section class="comments">
    <h3>댓글 <span class="count">[##_article_rep_rp_cnt_##]</span></h3>
    
    <!-- 댓글 목록 -->
    <s_rp_container>
      <ol class="comment-list">
        <s_rp_rep>
          <li id="[##_rp_rep_id_##]" class="comment">
            <div class="comment-header">
              <strong class="author">[##_rp_rep_name_##]</strong>
              <time class="date">[##_rp_rep_date_##]</time>
            </div>
            
            <div class="comment-body">
              [##_rp_rep_desc_##]
            </div>
            
            <div class="comment-actions">
              <a href="#" onclick="[##_rp_rep_onclick_reply_##]">답글</a>
              <a href="#" onclick="[##_rp_rep_onclick_delete_##]">삭제</a>
            </div>
            
            <!-- 대댓글 -->
            <s_rp2_container>
              <ol class="reply-list">
                <s_rp2_rep>
                  <li class="reply">
                    <strong>[##_rp2_rep_name_##]</strong>
                    <div>[##_rp2_rep_desc_##]</div>
                    <time>[##_rp2_rep_date_##]</time>
                  </li>
                </s_rp2_rep>
              </ol>
            </s_rp2_container>
          </li>
        </s_rp_rep>
      </ol>
    </s_rp_container>
    
    <!-- 댓글 입력 -->
    <s_rp_input_form>
      <form class="comment-form">
        <div class="form-group">
          <input type="text" name="[##_rp_input_name_##]" placeholder="이름" required>
          <input type="password" name="[##_rp_input_password_##]" placeholder="비밀번호" required>
          <input type="text" name="[##_rp_input_homepage_##]" placeholder="홈페이지">
        </div>
        
        <s_rp_member>
          <div class="member-info">
            <img src="[##_rp_member_rep_logo_##]" alt="">
            <span>[##_rp_member_rep_name_##]</span>
          </div>
        </s_rp_member>
        
        <textarea name="[##_rp_input_comment_##]" placeholder="댓글을 입력하세요" required></textarea>
        
        <s_rp_input_is_secret>
          <label>
            <input type="checkbox" name="[##_rp_input_is_secret_##]">
            <span>비밀 댓글</span>
          </label>
        </s_rp_input_is_secret>
        
        <button type="submit" onclick="[##_rp_onclick_submit_##]">댓글 등록</button>
      </form>
    </s_rp_input_form>
  </section>
</s_rp>
```

---

## 팁과 주의사항

### 개발 팁

1. **로컬 테스트**
   - 티스토리 관리자 → 스킨 편집에서 실시간 미리보기 활용
   - 개발자 도구로 치환자 변환 결과 확인

2. **반응형 디자인**
   - 모바일 우선 접근법 사용
   - 768px, 1200px 분기점 권장

3. **성능 최적화**
   - 이미지는 티스토리 CDN 활용
   - CSS/JS 파일 크기 최소화
   - 불필요한 치환자 사용 자제

4. **브라우저 호환성**
   - Chrome, Safari, Firefox, Edge 테스트
   - IE11은 선택적 지원

### 제한사항

1. **파일 크기**
   - 각 파일 2MB 이하
   - 전체 스킨 10MB 이하

2. **보안**
   - 외부 스크립트 CDN 사용 제한
   - iframe 사용 제한
   - 일부 JavaScript API 제한

3. **치환자 제한**
   - 중첩 깊이 제한
   - 반복 횟수 제한 (보통 100개)

### 디버깅

1. **치환자 미작동**
   - 오타 확인 (대소문자 구분)
   - 그룹 치환자 짝 확인
   - 조건문 중첩 확인

2. **스타일 미적용**
   - 티스토리 기본 스타일 우선순위 확인
   - !important 사용 고려
   - 선택자 특정성 확인

3. **JavaScript 오류**
   - 티스토리 전역 변수 충돌 확인
   - DOM 로드 타이밍 확인
   - 콘솔 에러 메시지 확인

---

## 참고 자료

- [티스토리 스킨 가이드 공식 문서](https://tistory.github.io/document-tistory-skin/)
- [티스토리 오픈 API](https://tistory.github.io/document-tistory-apis/)
- [티스토리 스킨 제작 포럼](https://notice.tistory.com)

---

이 가이드는 티스토리 스킨 제작에 필요한 핵심 내용을 담고 있습니다. 실제 제작 시에는 공식 문서를 참고하여 최신 정보를 확인하시기 바랍니다.