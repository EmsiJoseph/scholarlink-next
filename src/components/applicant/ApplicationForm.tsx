"use client";
import {
  ApplicationFormSchema,
  annualIncomeOptions,
  tracks,
  allTracks,
} from "@/schemas";
import {
  FormLayout,
  PrevButton,
  NextButton,
  FormStepper,
  StepsCompleted,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  SubmitButton,
} from "@saas-ui/react";
import { StepForm } from "@saas-ui/forms/zod";
import {
  ButtonGroup,
  Box,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
  Region,
} from "select-philippines-address";
import { useCurrentUser } from "@/hooks/use-current-user";
import { yearOptions } from "@/data/school-year-data";

export default function ApplicationForm() {
  const [listRegions, setListRegions] = useState<Region[]>([]);
  const [listProvinces, setListProvinces] = useState([]);
  const [listCitiesMunicipalities, setListCitiesMunicipalities] = useState([]);
  const [listBarangays, setListBarangays] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCityMunicipality, setSelectedCityMunicipality] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const [selectedMotherAnnualIncome, setSelectedMotherAnnualIncome] =
    useState("");
  const [selectedSchoolYearGraduated, setSelectedSchoolYearGraduated] =
    useState("");

  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedStrand, setSelectedStrand] = useState("");
  const [filteredStrands, setFilteredStrands] = useState<{ value: string }[]>(
    []
  );

  const [isStrandRequired, setIsStrandRequired] = useState(true);
  console.log({
    track: selectedTrack,
    strand: selectedStrand,
  });

  const handleTrackChange = (value: string) => {
    setSelectedTrack(value);
    setSelectedStrand((prev) =>
      value === "OTHER: SPECIFY" ? (prev = "NOT APPLICABLE") : (prev = "")
    );
    // @ts-ignore
    if (tracks[value].length === 0) {
      setIsStrandRequired(false);
    } else {
      setIsStrandRequired(true);
    }

    // @ts-ignore
    setFilteredStrands(tracks[value] || []);
  };

  const handleStrandChange = (value: string) => {
    setSelectedStrand((prev) => (prev = value));
  };

  useEffect(() => {
    setSelectedStrand("");
    setSelectedTrack("");
    setFilteredStrands([]);
  }, []);

  useEffect(() => {
    regions().then((region) => {
      console.log("Regions fetched: ", region); // Log the fetched regions
      if (Array.isArray(region)) {
        setListRegions(region);
      } else {
        console.error("Expected an array for regions but got:", typeof region);
      }
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
      // @ts-ignore
      cities(selectedProvince).then((city) =>
        // @ts-ignore
        setListCitiesMunicipalities(city)
      );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCityMunicipality) {
      // @ts-ignore
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

  const handleRegionChange = (value: any) => {
    value = value.toUpperCase();
    setSelectedRegion(value);
    setSelectedProvince("");
    setSelectedCityMunicipality("");
    setSelectedBarangay("");
    setListCitiesMunicipalities([]);
    setListBarangays([]);
  };

  const handleProvinceChange = (value: string) => {
    value = value.toUpperCase();
    setSelectedProvince(value);
    setSelectedCityMunicipality("");
    setSelectedBarangay("");
    setListCitiesMunicipalities([]);
    setListBarangays([]);
  };

  const handleCityMunicipalityChange = (value: string) => {
    value = value.toUpperCase();
    setSelectedCityMunicipality(value);
    setSelectedBarangay("");
    setListBarangays([]);
  };

  const handleBarangayChange = (value: string) => {
    value = value.toUpperCase();
    setSelectedBarangay(value);
  };

  const steps = [
    {
      name: "personal",
      schema: ApplicationFormSchema[0].personal,
    },
    {
      name: "address",
      schema: ApplicationFormSchema[1].address,
    },
    {
      name: "family",
      schema: ApplicationFormSchema[2].family,
    },
    {
      name: "education",
      schema: ApplicationFormSchema[3].education,
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

  const user = useCurrentUser();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width={["100%", "80%", "60%"]}>
        <StepForm
          reValidateMode="onChange"
          shouldUseNativeValidation={shouldUseNativeValidation}
          steps={steps}
          defaultValues={{
            lastName: "",
            middleName: "",
            firstName: "",
            dob: "",
            birthPlace: "",
            gender: "",
            email: user?.email || "",
            mobileNum: "",
            motherName: "",
            shsSchoolYearGraduated: "",
            strandName: "",
            specifiedTrackStrand: "",
            shsGwa: "",
            shsSchoolName: "",
            shsSchoolAddress: "",
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
                  <Heading size="lg" mb="4">
                    Personal information
                  </Heading>
                  <FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        autoFocus
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        isRequired
                        name="lastName"
                        label="Last name"
                        placeholder="Dela Cruz"
                      />
                      <Field
                        isRequired
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        name="firstName"
                        label="First name"
                        placeholder="Juan"
                      />
                      <Field
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        name="middleName"
                        label="Middle name (optional)"
                      />
                      <Field
                        isRequired
                        name="sex"
                        options={[
                          { value: "MALE" },
                          { value: "FEMALE" },
                          { value: "OTHER" },
                        ]}
                        type={select}
                        label="Sex"
                        placeholder="SELECT YOUR SEX"
                      />
                      <Field
                        isRequired
                        name="civilStatus"
                        options={[
                          { value: "SINGLE" },
                          { value: "MARRIED" },
                          { value: "WIDOWED" },
                          { value: "SEPARATED" },
                        ]}
                        type={select}
                        label="Civil status"
                        placeholder="SELECT CIVIL STATUS"
                      />
                      <Field
                        isRequired
                        name="nationality"
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        label="Nationality"
                        placeholder="ENTER YOUR NATIONALITY"
                        help="EXAMPLE: FILIPINO"
                      />
                    </FormLayout>
                    {/* @ts-ignore */}
                    <FormLayout templateColumns={[[1], null, "auto 65%"]}>
                      <Field
                        isRequired
                        name="dob"
                        label="Date of Birth"
                        type="date"
                      />
                      <Field
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        isRequired
                        name="birthPlace"
                        label="Birthplace"
                      />
                    </FormLayout>
                    {/* @ts-ignore */}
                    <FormLayout templateColumns={[[1], null, "auto 25%"]}>
                      <Field
                        isRequired
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        name="email"
                        type="email"
                        label="Email address"
                        placeholder="juandelacruz@gmail.com"
                      />
                      <Field
                        isRequired
                        name="mobileNum"
                        label="Mobile #"
                        placeholder="09XXXXXXXXX"
                      />
                    </FormLayout>
                    <ButtonGroup size="md">
                      <NextButton />
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>

                <FormStep name="address" title="Address">
                  <FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        autoFocus
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        isRequired
                        name="houseNumStreetName"
                        label="House # and street name"
                      />
                      <Field
                        style={{ textTransform: "uppercase" }}
                        isRequired
                        name="region"
                        type={select}
                        closeOnSelect
                        closeOnBlur
                        placeholder="SELECT REGION"
                        options={listRegions.map(
                          (region: {
                            region_code: string;
                            region_name: string;
                          }) => ({
                            value: region.region_code,
                            label: region.region_name.toUpperCase(),
                          })
                        )}
                        value={selectedRegion}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                // @ts-ignore
                                handleRegionChange(event.target.value);
                              }
                            : // @ts-ignore
                              (value: any) => {
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
                        placeholder="SELECT PROVINCE"
                        options={listProvinces.map(
                          (province: {
                            province_code: string;
                            province_name: string;
                          }) => ({
                            value: province.province_code,
                            label: province.province_name.toUpperCase(),
                          })
                        )}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                // @ts-ignore
                                handleProvinceChange(event.target.value);
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
                        name="cityMunicipality"
                        type={select}
                        closeOnSelect
                        closeOnBlur
                        placeholder="SELECT CITY/MUNICIPALITY"
                        options={listCitiesMunicipalities.map(
                          (city: { city_code: string; city_name: string }) => ({
                            value: city.city_code,
                            label: city.city_name.toUpperCase(),
                          })
                        )}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                handleCityMunicipalityChange(
                                  // @ts-ignore
                                  event.target.value
                                );
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
                          placeholder="SELECT BARANGAY"
                          options={listBarangays.map(
                            (barangay: {
                              brgy_code: string;
                              brgy_name: string;
                            }) => ({
                              value: barangay.brgy_code,
                              label: barangay.brgy_name.toUpperCase(),
                            })
                          )}
                          onChange={
                            isNative
                              ? (event: Event) => {
                                  // @ts-ignore
                                  handleBarangayChange(event.target.value);
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
                        <Field
                          isRequired
                          name="zipCode"
                          label="Zip code"
                          pattern="[0-9]*(.[0-9]+)?"
                        />
                      </FormLayout>
                    </FormLayout>
                    <ButtonGroup size="md">
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
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        name="motherName"
                        label="Mother's name"
                      />
                      <Field
                        isRequired
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        name="motherOccupation"
                        label="Mother's occupation"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        value={selectedMotherAnnualIncome}
                        name="motherAnnualIncome"
                        label="Mother's annual income"
                        placeholder="SELECT INCOME RANGE"
                        type={select}
                        options={annualIncomeOptions.map((value) => ({
                          value,
                        }))}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                setSelectedMotherAnnualIncome(
                                  // @ts-ignore
                                  event.target.value
                                );
                              }
                            : (value: any) => {
                                setSelectedMotherAnnualIncome(value);
                              }
                        }
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
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        label="Father's name"
                      />
                      <Field
                        isRequired
                        name="fatherOccupation"
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        label="Father's occupation"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        name="fatherAnnualIncome"
                        label="Father's annual income"
                        placeholder="SELECT INCOME RANGE"
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
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
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
                            { value: "MOTHER" },
                            { value: "FATHER" },
                            { value: "SIBLING" },
                            { value: "RELATIVE" },
                            { value: "OTHER" },
                          ]}
                          placeholder="SELECT RELATIONSHIP"
                        />
                        <Field
                          isRequired
                          name="guardianMobileNum"
                          placeholder="09XXXXXXXXX"
                          label="Mobile #"
                        />
                      </FormLayout>
                    </FormLayout>

                    <ButtonGroup size="md">
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
                        type={select}
                        closeOnSelect
                        closeOnBlur
                        placeholder="SELECT TRACK"
                        options={allTracks}
                        value={selectedTrack}
                        onChange={
                          isNative
                            ? (event: Event) => {
                                // @ts-ignore
                                handleTrackChange(event.target.value);
                              }
                            : // @ts-ignore
                              (value: Value) => {
                                handleTrackChange(value);
                              }
                        }
                        name="trackName"
                        label="Track name"
                      />
                      {selectedTrack === "OTHER: SPECIFY" ? (
                        <Field
                          autoFocus
                          isRequired={!isStrandRequired}
                          style={{ textTransform: "uppercase" }}
                          onChange={(e: any) => {
                            e.target.value = e.target.value.toUpperCase();
                            setSelectedStrand(
                              (prev) => (prev = "NOT APPLICABLE")
                            );
                          }}
                          placeholder="SPECIFY TRACK AND STRAND"
                          name="specifiedTrackStrand"
                          label="Other track and strand"
                        />
                      ) : selectedTrack === "ARTS AND DESIGN TRACK" ||
                        selectedTrack === "SPORTS TRACK" ? (
                        <Field
                          autoFocus
                          isRequired={!isStrandRequired}
                          name="strandName"
                          label="Strand name"
                          value="NOT APPLICABLE"
                          isReadOnly
                        />
                      ) : (
                        <Field
                          autoFocus
                          isRequired={isStrandRequired}
                          type={select}
                          closeOnSelect
                          closeOnBlur
                          placeholder="SELECT STRAND"
                          options={filteredStrands}
                          value={selectedStrand}
                          onChange={
                            isNative
                              ? (event: Event) => {
                                  // @ts-ignore
                                  handleStrandChange(event.target.value);
                                }
                              : // @ts-ignore
                                (value: Value) => {
                                  handleStrandChange(value);
                                }
                          }
                          isDisabled={
                            !selectedTrack ||
                            !filteredStrands.length ||
                            !isStrandRequired
                          }
                          name="strandName"
                          label="Strand name"
                        />
                      )}
                    </FormLayout>
                    <FormLayout columns={[1, null, 2]}>
                      <Field
                        isRequired
                        name="shsSchoolYearGraduated"
                        label="School year graduated"
                        type={select}
                        options={yearOptions}
                        placeholder="SELECT SCHOOL YEAR"
                        onChange={
                          isNative
                            ? (event: Event) => {
                                setSelectedSchoolYearGraduated(
                                  // @ts-ignore
                                  event.target.value
                                );
                              }
                            : (value: any) => {
                                setSelectedSchoolYearGraduated(value);
                              }
                        }
                        value={selectedSchoolYearGraduated}
                        closeOnSelect
                        closeOnBlur
                      />
                      <Field
                        isRequired
                        placeholder="85.00"
                        pattern="[0-9]*(.[0-9]+)?"
                        name="shsGwa"
                        label="General Weighted Average"
                      />
                    </FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        isRequired
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        name="shsSchoolName"
                        label="Senior High School name"
                      />
                      <Field
                        isRequired
                        style={{ textTransform: "uppercase" }}
                        onChange={(e: any) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        name="shsSchoolAddress"
                        label="Senior High School address"
                      />
                      <Field
                        isRequired
                        name="shsSchoolContactNum"
                        label="Senior High School contact number"
                      />
                    </FormLayout>

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
