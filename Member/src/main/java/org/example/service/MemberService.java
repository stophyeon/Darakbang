package org.example.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.MemberDto;
import org.example.dto.ResponseCustom;
import org.example.entity.Member;
import org.example.jwt.JwtDto;
import org.example.jwt.JwtProvider;
import org.example.repository.member.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationProvider authenticationProvider;
    private final JwtProvider jwtProvider;
    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;
    @Value("${spring.cloud.gcp.storage.project-id}")
    private String projectId;




    public boolean duplicate(MemberDto memberDto){
        return memberRepository.findByEmail(memberDto.getEmail()).isEmpty();
    }
    @Transactional
    public ResponseCustom join(MemberDto memberDto, MultipartFile profileImg) throws IOException {
        if (!duplicate(memberDto)){
            return ResponseCustom.builder()
                    .message("이미 가입되어 있는 회원입니다.")
                    .state("중복된 이메일")
                    .build();
        }
        else {
            if(!profileImg.isEmpty()){
                String file_name=imageUpload(profileImg);
                memberDto.setImage("https://storage.googleapis.com/darakban-img/"+file_name);
            }
            memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));

            Member member = Member.builder()
                    .memberDto(memberDto)
                    .build();
            memberRepository.save(member);
            return ResponseCustom.builder()
                    .message("회원가입 되었습니다")
                    .state("처리 성공")
                    .build();
        }

    }
    public String imageUpload(MultipartFile profileImg) throws IOException {
        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-3b7415068a92.json" ).openStream();
        String origin_name =profileImg.getOriginalFilename();
        String file_name=changedImageName(origin_name);
        String ext = profileImg.getContentType();
        log.info(origin_name);
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();
        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder(bucketName, file_name)
                        .setContentType(ext)
                        .build(),
                profileImg.getInputStream()
        );
        return file_name;
    }
    private static String changedImageName(String originName) {
        String random = UUID.randomUUID().toString();
        return random+originName;
    }
    public JwtDto login(MemberDto memberDto){
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(memberDto.getEmail(),memberDto.getPassword());
        Authentication auth = authenticationProvider.authenticate(token);
        return jwtProvider.createToken(auth);
    }
    public MemberDto myProfile(String email){
        return Member.toDto(memberRepository.findByEmail(email).get());
    }
    public MemberDto profile(String nickName) {
        log.info(nickName);
        return Member.toDto(memberRepository.findByNickName(nickName).get());
    }
    public boolean duplicateNickName(String nickName){
        return memberRepository.findByNickName(nickName).isPresent();
    }
    public String getNickName(String email){
        return memberRepository.findByEmail(email).get().getNickName();
    }
    public ResponseCustom updateProfile(MultipartFile profileImg,MemberDto memberDto,String email) throws IOException {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            if (!profileImg.isEmpty()){
                String file_name=imageUpload(profileImg);
                memberDto.setImage("https://storage.googleapis.com/darakban-img/"+file_name);
                imageDelete(email);
            }
            memberRepository.updateInfo(Member.builder().memberDto(memberDto).build());
            return ResponseCustom.builder()
                    .state("success")
                    .message("회원 정보 수정에 성공했습니다.")
                    .build();
        }
        return ResponseCustom.builder()
                .state("fail")
                .message("회원가입되어있지않은 회원입니다.")
                .build();
    }

    public void imageDelete(String email) throws IOException {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            String img = member.get().getImage().substring(44);
            InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-3b7415068a92.json" ).openStream();
            Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
            Blob blob = storage.get(bucketName, img);
            Storage.BlobSourceOption precondition =
                    Storage.BlobSourceOption.generationMatch(blob.getGeneration());
            storage.delete(bucketName, img, precondition);
        }
    }
}
