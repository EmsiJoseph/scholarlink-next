import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Text, Box, Image } from "@chakra-ui/react";

type StatusCardProps = {
  imageSrc: string;
  count: number | string;
  title: string;
  subtitle: string;
};

const StatusCard = ({ imageSrc, count, title, subtitle }: StatusCardProps) => {
  return (
    <Card className="p-2 w-full max-w-lg mx-auto flex items-center">
      <CardHeader className="flex items-center justify-center p-4">
        <Box>
          <Image src={imageSrc} alt={title} boxSize="60px" />
        </Box>
      </CardHeader>
      <CardContent className="flex items-center p-1">
        <Text fontSize="6xl" fontWeight="bold" className="text-left mr-6">
          {count}
        </Text>
        <Box>
          <Text fontSize="3xl" fontWeight="semibold" className="text-left">
            {title}
          </Text>
          <Text fontSize="2xl" color="gray.500" className="text-left">
            {subtitle}
          </Text>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
