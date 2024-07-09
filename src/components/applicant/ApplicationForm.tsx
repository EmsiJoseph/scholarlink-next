import { ApplicationFormSchema, annualIncomeOptions } from "@/schemas";
import {
  FormLayout,
  PrevButton,
  NextButton,
  FormStepper,
  StepsCompleted,
  FormValue,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  PropertyList,
  Property,
  SubmitButton,
} from "@saas-ui/react";
import { StepForm } from "@saas-ui/forms/zod";
import { Text, ButtonGroup, Box, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

export default function ApplicationForm() {
  const [listRegions, setListRegions] = useState([]);
  const [listProvinces, setListProvinces] = useState([]);
  const [listCitiesMunicipalities, setListCitiesMunicipalities] = useState([]);
  const [listBarangays, setListBarangays] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCityMunicipality, setSelectedCityMunicipality] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  useEffect(() => {
    regions().then((region) => {
      // @ts-ignore
      setListRegions(region);
    });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      // @ts-ignore
      provinces(selectedRegion).then((province) => setListProvinces(province));
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      cities(selectedProvince).then((city) =>
        // @ts-ignore
        setListCitiesMunicipalities(city)
      );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCityMunicipality) {
      barangays(selectedCityMunicipality).then((barangay) =>
        // @ts-ignore
        setListBarangays(barangay)
      );
    }
  }, [selectedCityMunicipality]);

  const isNative = useBreakpointValue({
    base: true,
    md: false,
  });

  const handleRegionChangeNative = (e: any) => {
    setSelectedRegion(e.target.value);
    setSelectedProvince("");
    setSelectedCityMunicipality("");
    setSelectedBarangay("");
    setListCitiesMunicipalities([]);
    setListBarangays([]);
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedProvince("");
    setSelectedCityMunicipality("");
    setSelectedBarangay("");
    setListCitiesMunicipalities([]);
    setListBarangays([]);
  };

  const handleProvinceChangeNative = (e: any) => {
    setSelectedProvince(e.target.value);
    setSelectedCityMunicipality("");
    setSelectedBarangay("");
    setListCitiesMunicipalities([]);
    setListBarangays([]);
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCityMunicipality("");
    setSelectedBarangay("");
    setListCitiesMunicipalities([]);
    setListBarangays([]);
  };

  const handleCityMunicipalityChangeNative = (e: any) => {
    setSelectedCityMunicipality(e.target.value);
    setSelectedBarangay("");
    setListBarangays([]);
  };

  const handleCityMunicipalityChange = (value: string) => {
    setSelectedCityMunicipality(value);
    setSelectedBarangay("");
    setListBarangays([]);
  };

  const handleBarangayChangeNative = (e: any) => {
    setSelectedBarangay(e.target.value);
  };

  const handleBarangayChange = (value: string) => {
    setSelectedBarangay(value);
  };

  const steps = [
    {
      name: "personal",
      schema: ApplicationFormSchema[0].personal,
    },
    {
      name: "contact",
      schema: ApplicationFormSchema[1].contact,
    },
    {
      name: "address",
      schema: ApplicationFormSchema[2].address,
    },
    {
      name: "family",
      schema: ApplicationFormSchema[3].family,
    },
    {
      name: "education",
      schema: ApplicationFormSchema[4].education,
    },
  ];

  const onSubmit = (params: any) => {
    console.log(params);
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const orientation = useBreakpointValue({
    base: "vertical",
    md: "horizontal",
  });

  const shouldUseNativeValidation = useBreakpointValue({
    base: true,
    md: false,
  });

  const select = useBreakpointValue({
    base: "native-select",
    md: "select",
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width={["100%", "80%", "60%"]}>
        <StepForm
          shouldUseNativeValidation={shouldUseNativeValidation}
          steps={steps}
          defaultValues={{
            lastName: "",
            middleName: "",
            firstName: "",
            dob: "",
            birthPlace: "",
          }}
          onSubmit={onSubmit}
        >
          {({ Field, FormStep }) => (
            <FormLayout>
              <FormStepper
                orientation={orientation as "vertical" | "horizontal"}
                position="sticky"
                top="0"
                zIndex="docked"
                backgroundColor="white"
              >
                <FormStep name="personal" title="Personal">
                  <FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        autoFocus
                        isRequired
                        name="lastName"
                        label="Last name"
                        placeholder="Dela Cruz"
                      />
                      <Field
                        isRequired
                        name="firstName"
                        label="First name"
                        placeholder="Juan"
                      />
                      <Field name="middleName" label="Middle name (optional)" />
                    </FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        isRequired
                        name="dob"
                        label="Date of Birth"
                        type="date"
                      />
                      <Field isRequired name="birthPlace" label="Birthplace" />
                      <Field
                        isRequired
                        name="gender"
                        options={[
                          { value: "Male" },
                          { value: "Female" },
                          { value: "Other" },
                        ]}
                        type={select}
                        label="Gender"
                        placeholder="Select your gender"
                      />
                    </FormLayout>
                    <NextButton />
                  </FormLayout>
                </FormStep>

                <FormStep name="contact" title="Contact">
                  {/* @ts-ignore */}
                  <FormLayout templateColumns={[[1], null, "auto 25%"]}>
                    <Field
                      isRequired
                      name="email"
                      type="email"
                      label="Email address"
                      placeholder="juandelacruz@gmail.com"
                      autoFocus
                    />
                    <Field
                      isRequired
                      name="mobileNum"
                      label="Mobile number"
                      placeholder="09XXXXXXXXX"
                    />
                    <ButtonGroup>
                      <PrevButton variant="ghost" />
                      <NextButton />
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>
                <FormStep name="address" title="Address">
                  <FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        isRequired
                        name="houseNumStreetName"
                        label="House # and street name"
                        autoFocus
                      />
                      <Field
                        isRequired
                        name="region"
                        type={select}
                        closeOnSelect
                        closeOnBlur
                        placeholder="Select region"
                        options={listRegions.map(
                          (region: {
                            region_code: string;
                            region_name: string;
                          }) => ({
                            value: region.region_code,
                            label: region.region_name,
                          })
                        )}
                        defaultValue={selectedRegion}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                handleRegionChangeNative(event);
                              }
                            : // @ts-ignore
                              (value: Value) => {
                                handleRegionChange(value);
                              }
                        }
                        label="Region"
                      />
                      <Field
                        isRequired
                        name="province"
                        type={select}
                        closeOnSelect
                        closeOnBlur
                        placeholder="Select province"
                        options={listProvinces.map(
                          (province: {
                            province_code: string;
                            province_name: string;
                          }) => ({
                            value: province.province_code,
                            label: province.province_name,
                          })
                        )}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                handleProvinceChangeNative(event);
                              }
                            : // @ts-ignore
                              (value: Value) => {
                                handleProvinceChange(value);
                              }
                        }
                        value={selectedProvince}
                        label="Province"
                        isDisabled={!selectedRegion}
                      />
                    </FormLayout>
                    {/* @ts-ignore */}
                    <FormLayout templateColumns={[[1], null, "auto 55%"]}>
                      <Field
                        isRequired
                        name="municipality"
                        type={select}
                        closeOnSelect
                        closeOnBlur
                        placeholder="Select city or municipality"
                        options={listCitiesMunicipalities.map(
                          (city: { city_code: string; city_name: string }) => ({
                            value: city.city_code,
                            label: city.city_name,
                          })
                        )}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                handleCityMunicipalityChangeNative(event);
                              }
                            : // @ts-ignore
                              (value: Value) => {
                                handleCityMunicipalityChange(value);
                              }
                        }
                        value={selectedCityMunicipality}
                        label="City/Municipality"
                        isDisabled={!selectedProvince}
                      />
                      <FormLayout
                        templateColumns={["auto 25%", null, "auto 25%"]}
                      >
                        <Field
                          isRequired
                          name="barangay"
                          type={select}
                          closeOnSelect
                          closeOnBlur
                          placeholder="Select barangay"
                          options={listBarangays.map(
                            (barangay: {
                              brgy_code: string;
                              brgy_name: string;
                            }) => ({
                              value: barangay.brgy_code,
                              label: barangay.brgy_name,
                            })
                          )}
                          onChange={
                            isNative
                              ? (event: Event) => {
                                  handleBarangayChangeNative(event);
                                }
                              : // @ts-ignore
                                (value: Value) => {
                                  handleBarangayChange(value);
                                }
                          }
                          value={selectedBarangay}
                          label="Barangay"
                          isDisabled={!selectedCityMunicipality}
                        />
                        <Field isRequired name="zipCode" label="Zip code" />
                      </FormLayout>
                    </FormLayout>
                    <ButtonGroup>
                      <PrevButton variant="ghost" />
                      <NextButton />
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>
                <FormStep name="family" title="Family">
                  <FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        autoFocus
                        isRequired
                        name="motherName"
                        label="Mother's name"
                      />
                      <Field
                        isRequired
                        name="motherOccupation"
                        label="Mother's occupation"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        name="motherAnnualIncome"
                        label="Mother's annual income"
                        placeholder="Select income range"
                        type={select}
                        options={annualIncomeOptions.map((value) => ({
                          value,
                        }))}
                      />
                      <Field
                        isRequired
                        name="motherMobileNum"
                        placeholder="09XXXXXXXXX"
                        label="Mother's mobile number"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        name="fatherName"
                        label="Father's name"
                      />
                      <Field
                        isRequired
                        name="fatherOccupation"
                        label="Father's occupation"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        name="fatherAnnualIncome"
                        label="Father's annual income"
                        placeholder="Select income range"
                        type={select}
                        options={annualIncomeOptions.map((value) => ({
                          value,
                        }))}
                      />
                      <Field
                        isRequired
                        placeholder="09XXXXXXXXX"
                        name="fatherMobileNum"
                        label="Father's mobile number"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        name="guardianName"
                        label="Guardian's name"
                      />
                      <FormLayout
                        templateColumns={["auto 40%", null, "auto 40%"]}
                      >
                        <Field
                          isRequired
                          name="guardianRelationshipToApplicant"
                          label="Relationship to applicant"
                          type={select}
                          options={[
                            { value: "Mother" },
                            { value: "Father" },
                            { value: "Sibling" },
                            { value: "Relative" },
                            { value: "Other" },
                          ]}
                          placeholder="Select relationship"
                        />
                        <Field
                          isRequired
                          name="guardianMobileNum"
                          placeholder="09XXXXXXXXX"
                          label="Mobile number"
                        />
                      </FormLayout>
                    </FormLayout>

                    <ButtonGroup>
                      <PrevButton variant="ghost" />
                      <NextButton />
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>
                <FormStep name="education" title="Education">
                  <FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        autoFocus
                        isRequired
                        name="trackName"
                        label="Track name"
                      />
                      <Field isRequired name="strandName" label="Strand name" />
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        name="shsSchoolYearGraduated"
                        label="School year graduated"
                      />
                      <Field
                        isRequired
                        placeholder="85.00"
                        name="shsGwa"
                        label="General Weighted Average"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        isRequired
                        name="shsSchoolName"
                        label="Senior High School name"
                      />
                      <Field
                        isRequired
                        name="shsSchoolAddress"
                        label="School address"
                      />
                      <Field
                        isRequired
                        name="shsSchoolContactNum"
                        label="School contact number"
                      />
                    </FormLayout>

                    <ButtonGroup>
                      <PrevButton variant="ghost" />
                      <NextButton />
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>
                <FormStep name="confirm" title="Confirm">
                  <FormLayout>
                    <Text>Please confirm that all information is correct.</Text>
                    <PropertyList>
                      <Property
                        label="Last name"
                        value={<FormValue name="lastName" />}
                      />
                      <Property
                        label="First name"
                        value={<FormValue name="firstName" />}
                      />
                      <Property
                        label="Middle name"
                        value={<FormValue name="middleName" />}
                      />
                      <Property
                        label="Date of Birth"
                        value={<FormValue name="dob" />}
                      />
                      <Property
                        label="Birthplace"
                        value={<FormValue name="birthPlace" />}
                      />
                    </PropertyList>
                    <ButtonGroup>
                      <PrevButton variant="ghost" />
                      <SubmitButton />
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>
                <StepsCompleted>
                  <LoadingOverlay>
                    <LoadingSpinner />
                    <LoadingText>Saving your information...</LoadingText>
                  </LoadingOverlay>
                </StepsCompleted>
              </FormStepper>
            </FormLayout>
          )}
        </StepForm>
      </Box>
    </Box>
  );
}
