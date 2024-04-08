package org.example.service.storage;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.Member;
import org.example.repository.member.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class StorageService {
    private final MemberRepository memberRepository;

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    @Value("${spring.cloud.gcp.storage.project-id}")
    private String projectId;

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
    public void imageDelete(String email) throws IOException {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            String img = member.get().getImage().substring(44);
            InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-3b7415068a92.json" ).openStream();
            Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
            Blob blob = storage.get(bucketName, img);
            if (blob==null){return;}
            else{Storage.BlobSourceOption precondition =
                    Storage.BlobSourceOption.generationMatch(blob.getGeneration());
                storage.delete(bucketName, img, precondition);}

        }
    }
}
