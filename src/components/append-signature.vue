<template>
  <v-row>
    <div class="text-center my-12" style="width: 100%;">
      <b>SIGNATURE COMPONENT GOES HERE</b>
    </div>
    <v-col cols="6" class="d-flex flex-column align-center">
      <div class="formSectionTitle">Signatures (First Party)</div>
      <div class="d-flex justify-center">
        <div class="d-flex align-center mr-6">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Company</label>
        </div>
        <div class="d-flex align-center">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Person</label>
        </div>
      </div>
      <div class="appendSignature"></div>
      <div class="appendSignature2 mt-12">
        <v-image-input
          class="sigUpload"
          uploadIcon="mdi-upload"
          :image-quality="0.85"
          :image-height="155"
          :image-width="355"
          :clearable="true"
          drawer
          name="rr"
          image-format="jpeg"
        />
      </div>
      <cld-image cloudName="demo" publicId="sample" crop="scale" width="300" />
    </v-col>
    <v-col cols="6" class="d-flex flex-column align-center">
      <div class="formSectionTitle">Signatures (First Party)</div>
      <div class="d-flex justify-center">
        <div class="d-flex align-center mr-6">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Company</label>
        </div>
        <div class="d-flex align-center">
          <input type="radio" name="company" value="Person" id="company" />
          <label for="form.radioId1" class="ml-2">Person</label>
        </div>
      </div>
      <div class="appendSignature"></div>
      <div class="appendSignature2 mt-12">
        <v-image-input
          class="sigUpload"
          uploadIcon="mdi-upload"
          :image-quality="0.85"
          :image-height="155"
          :image-width="355"
          :clearable="true"
          drawer
          name="rr"
          image-format="jpeg"
        />
      </div>
    </v-col>
  </v-row>
</template>
